import { setSearchValue } from '@app/client/@core/ducks';
import { AppState } from '@app/client/ducks/store';
import { useAxios } from '@app/client/utils';
import {
    getDateDifference,
    getFormattedAmount,
    getFormattedDateAndTime,
    getFullName,
    Pagination,
    RepairingRecord,
    REPAIRING_STATUS,
    REPAIRING_STATUS_REVERSE,
} from '@app/shared';
import {
    Add,
    ArrowDownwardOutlined,
    ArrowUpwardOutlined,
    CalendarMonthOutlined,
    CloseOutlined,
    CurrencyRupeeOutlined,
    Done,
    PersonOutline,
    PhoneOutlined,
} from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import {
    Alert,
    Box,
    BoxProps,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Fab,
    FormControlLabel,
    Grid,
    InputAdornment,
    Modal,
    Radio,
    RadioGroup,
    Skeleton,
    SkeletonProps,
    styled,
    TextField,
    Tooltip,
    Typography,
    TypographyProps,
} from '@mui/material';
import {
    ActionCreatorWithOptionalPayload,
    AnyAction,
    bindActionCreators,
    Dispatch,
} from '@reduxjs/toolkit';
import { first, isEmpty, padStart, truncate } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const StyledSkeleton = styled(Skeleton)<SkeletonProps>(() => ({
    height: 30,
    marginBottom: 2,
}));

const ModalStyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '30%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const Header = styled(Typography)<TypographyProps>(({ theme }) => ({
    padding: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface CardSkeletonProps {
    count: number;
}

const CardSkeleton = ({ count }: CardSkeletonProps) => (
    <>
        {Array(count)
            .fill(count)
            .map((item) => (
                <Card key={Math.random() * item}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sx={{ margin: 3 }}>
                            <StyledSkeleton variant="rectangular" />
                            <StyledSkeleton />
                            <Divider
                                sx={{
                                    marginTop: 3.5,
                                    marginBottom: 3.5,
                                }}
                            />
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={12} lg={6}>
                                    <StyledSkeleton />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6}>
                                    <StyledSkeleton />
                                </Grid>
                            </Grid>
                            <StyledSkeleton variant="rectangular" />
                        </Grid>
                    </Grid>
                </Card>
            ))}
    </>
);

interface RepairingProps {
    searchValue: string;
    search: ActionCreatorWithOptionalPayload<string, string>;
}

type ModalAction = 'repaired' | 'cancelled';

interface Body {
    status: number;
    actualRepairingCost: string | null;
}

type Errors = {
    [key in keyof Body]?: string[];
};

const Repairing = ({ searchValue, search }: RepairingProps) => {
    const router = useRouter();
    const { axios } = useAxios();
    const [repairingRecords, setRepairingRecords] = useState<RepairingRecord[]>(
        [],
    );
    const [pagination, setPagination] = useState<
        Pagination<[]>['pagination'] | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalAction, setModalAction] = useState<ModalAction | null>(null);
    const [repairingId, setRepairingId] = useState<number | null>(null);
    const [repairingStatus, setRepairingStatus] = useState<number | null>(null);
    const [actualRepairingCost, setActualRepairingCost] = useState<
        number | null
    >(null);
    const [errors, setErrors] = useState<Errors>({
        actualRepairingCost: [],
        status: [],
    });

    const fetchRepairingRecords = async (
        fetchFreshRecords = false,
    ) => {
        setIsLoading(true);

        let url = 'repairing';

        if (!fetchFreshRecords && pagination && pagination.nextPage) {
            url += `?page=${pagination.nextPage}`;
        }

        if (searchValue) {
            const searchQuery = `searchValue=${searchValue}`;
            url +=
                url.indexOf('?') > -1 ? `&${searchQuery}` : `?${searchQuery}`;
        }

        const { data } = await axios<Pagination<RepairingRecord>>({
            method: 'get',
            url,
        });

        if (data) {
            setIsLoading(false);
            setRepairingRecords((prev) =>
                fetchFreshRecords
                    ? [...data.records]
                    : [...prev, ...data.records],
            );
            setPagination(data.pagination);
        }
    };

    useEffect(() => {
        (async () => await fetchRepairingRecords(true))();
    }, [searchValue]);

    const observer = useRef(null);
    const lastElementRef = useCallback(
        (node: Record<string, any>) => {
            if (isLoading) {
                return;
            }

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver(async (entries) => {
                if (
                    entries[0].isIntersecting &&
                    pagination &&
                    pagination.nextPage
                ) {
                    await fetchRepairingRecords();
                }
            });

            if (node) {
                observer.current.observe(node);
            }
        },
        [isLoading, pagination],
    );

    const handleActionButtonClick = (
        repairingId: number,
        action: ModalAction,
    ) => {
        setRepairingId(repairingId);
        setModalAction(action);
    };

    const closeModal = () => {
        setModalAction(null);
        setErrors({
            actualRepairingCost: [],
            status: [],
        });
        setRepairingStatus(null);
        setActualRepairingCost(null);
    };

    const handleStatusUpdate = async () => {
        const body: Body = {
            status: repairingStatus,
            actualRepairingCost:
                (actualRepairingCost && actualRepairingCost.toString()) || null,
        };
        const { error } = await axios({
            url: `repairing/${repairingId}`,
            method: 'patch',
            data: body,
        });

        if (error) {
            setErrors(error);
            return;
        }

        closeModal();
        search('');
        await fetchRepairingRecords(true);
    };

    const handleAddItem = () => {
        router.push('/repairing/add');
    };

    return (
        <Box>
            <Grid container>
                <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 3 }} spacing={6}>
                    {repairingRecords.map((repairingRecord, index) => (
                        <Card key={index}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <CardContent sx={{ paddingBottom: 0 }}>
                                        <Typography variant="body2">
                                            {`#${padStart(
                                                `${repairingRecord.id}`,
                                                4,
                                                '0',
                                            )}`}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                wordWrap: 'break-word',
                                            }}
                                        >
                                            {repairingRecord.brand.brandName} -{' '}
                                            {
                                                repairingRecord.brandModel
                                                    .modelName
                                            }
                                        </Typography>
                                        <Divider
                                            sx={{
                                                marginTop: 3.5,
                                                marginBottom: 3.5,
                                            }}
                                        />
                                        <Grid container spacing={4}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <StyledBox>
                                                    <Tooltip
                                                        title="Customer Name"
                                                        placement="bottom-start"
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItem:
                                                                    'center',
                                                            }}
                                                        >
                                                            <PersonOutline
                                                                sx={{
                                                                    color: 'primary.main',
                                                                    marginRight: 2.75,
                                                                }}
                                                                fontSize="small"
                                                            />
                                                            <Typography variant="body2">
                                                                {getFullName(
                                                                    repairingRecord.customer,
                                                                )}
                                                            </Typography>
                                                        </Box>
                                                    </Tooltip>
                                                </StyledBox>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <Tooltip
                                                    title="Customer Phone"
                                                    placement="bottom-start"
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItem: 'center',
                                                        }}
                                                    >
                                                        <PhoneOutlined
                                                            sx={{
                                                                color: 'primary.main',
                                                                marginRight: 2.75,
                                                            }}
                                                            fontSize="small"
                                                        />
                                                        <Typography variant="body2">
                                                            {
                                                                repairingRecord
                                                                    .customer
                                                                    .phone
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                        <Divider
                                            sx={{
                                                marginTop: 3.5,
                                                marginBottom: 3.5,
                                            }}
                                        />
                                        {repairingRecord.issues.map(
                                            (issue, index) =>
                                                issue.issue.length > 30 ? (
                                                    <Tooltip
                                                        key={index}
                                                        title={issue.issue}
                                                        placement="bottom-start"
                                                    >
                                                        <Chip
                                                            sx={{
                                                                margin: 1,
                                                            }}
                                                            label={truncate(
                                                                issue.issue,
                                                                {
                                                                    length: 30,
                                                                },
                                                            )}
                                                            variant="outlined"
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <Chip
                                                        key={index}
                                                        sx={{ margin: 1 }}
                                                        label={issue.issue}
                                                        variant="outlined"
                                                    />
                                                ),
                                        )}
                                        <Divider
                                            sx={{
                                                marginTop: 3.5,
                                                marginBottom: 3.5,
                                            }}
                                        />
                                        <Grid container spacing={4}>
                                            <Grid item xs={12} >
                                                <Box>
                                                    <Tooltip
                                                        title={
                                                            repairingRecord.actualReturnDate
                                                                ? 'Actual Return Date'
                                                                : 'Expected Return Date'
                                                        }
                                                        placement="bottom-start"
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItem:
                                                                    'center',
                                                            }}
                                                        >
                                                            <CalendarMonthOutlined
                                                                sx={{
                                                                    color: 'primary.main',
                                                                    marginRight: 2.75,
                                                                }}
                                                                fontSize="small"
                                                            />
                                                            <Typography variant="body2">
                                                                {getFormattedDateAndTime(
                                                                    repairingRecord.actualReturnDate ||
                                                                        repairingRecord.expectedReturnDate,
                                                                )}
                                                            </Typography>
                                                            {repairingRecord.actualReturnDate &&
                                                                getDateDifference(
                                                                    repairingRecord.expectedReturnDate,
                                                                    repairingRecord.actualReturnDate,
                                                                ).isDelayed && (
                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                'flex',
                                                                            width: '70%',
                                                                        }}
                                                                    >
                                                                        <ArrowUpwardOutlined
                                                                            sx={{
                                                                                color: 'error.main',
                                                                                marginLeft: 2.75,
                                                                            }}
                                                                            fontSize="small"
                                                                        />
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="error.main"
                                                                        >
                                                                            {
                                                                                getDateDifference(
                                                                                    repairingRecord.expectedReturnDate,
                                                                                    repairingRecord.actualReturnDate,
                                                                                )
                                                                                    .duration
                                                                            }{' '}
                                                                            delayed
                                                                        </Typography>
                                                                    </Box>
                                                                )}
                                                            {repairingRecord.actualReturnDate &&
                                                                getDateDifference(
                                                                    repairingRecord.expectedReturnDate,
                                                                    repairingRecord.actualReturnDate,
                                                                ).isEarly && (
                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                'flex',
                                                                        }}
                                                                    >
                                                                        <ArrowDownwardOutlined
                                                                            sx={{
                                                                                color: 'success.main',
                                                                                marginLeft: 2.75,
                                                                            }}
                                                                            fontSize="small"
                                                                        />
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="success.main"
                                                                        >
                                                                            {
                                                                                getDateDifference(
                                                                                    repairingRecord.expectedReturnDate,
                                                                                    repairingRecord.actualReturnDate,
                                                                                )
                                                                                    .duration
                                                                            }{' '}
                                                                            early
                                                                        </Typography>
                                                                    </Box>
                                                                )}
                                                        </Box>
                                                    </Tooltip>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Tooltip
                                                    title={
                                                        repairingRecord.actualRepairingCost
                                                            ? 'Actual Repairing Cost'
                                                            : 'Expected Repairing Cost'
                                                    }
                                                    placement="bottom-start"
                                                >
                                                    <Box
                                                        sx={{
                                                            mb: 6.75,
                                                            display: 'flex',
                                                            alignItem: 'center',
                                                        }}
                                                    >
                                                        <CurrencyRupeeOutlined
                                                            sx={{
                                                                color: 'primary.main',
                                                                marginRight: 2.75,
                                                            }}
                                                            fontSize="small"
                                                        />
                                                        <Typography variant="body2">
                                                            {getFormattedAmount(
                                                                repairingRecord.actualRepairingCost ||
                                                                    repairingRecord.expectedRepairingCost,
                                                            )}
                                                        </Typography>
                                                        {repairingRecord.actualRepairingCost &&
                                                            repairingRecord.actualRepairingCost -
                                                                repairingRecord.expectedRepairingCost >
                                                                0 && (
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                    }}
                                                                >
                                                                    <ArrowUpwardOutlined
                                                                        sx={{
                                                                            color: 'error.main',
                                                                            marginLeft: 2.75,
                                                                        }}
                                                                        fontSize="small"
                                                                    />
                                                                    <Typography
                                                                        variant="body2"
                                                                        color="error.main"
                                                                    >
                                                                        {getFormattedAmount(
                                                                            repairingRecord.actualRepairingCost -
                                                                                repairingRecord.expectedRepairingCost,
                                                                        )}
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                        {repairingRecord.actualRepairingCost &&
                                                            repairingRecord.actualRepairingCost -
                                                                repairingRecord.expectedRepairingCost <
                                                                0 && (
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                    }}
                                                                >
                                                                    <ArrowDownwardOutlined
                                                                        sx={{
                                                                            color: 'success.main',
                                                                            marginLeft: 2.75,
                                                                        }}
                                                                        fontSize="small"
                                                                    />
                                                                    <Typography
                                                                        variant="body2"
                                                                        color="success.main"
                                                                    >
                                                                        {getFormattedAmount(
                                                                            repairingRecord.expectedRepairingCost -
                                                                                repairingRecord.actualRepairingCost,
                                                                        )}
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                    </Box>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    {repairingRecord.status ===
                                        REPAIRING_STATUS.PENDING && (
                                        <CardActions className="card-action-dense">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    width: '100%',
                                                }}
                                            >
                                                <Tooltip title="Mark Repaired">
                                                    <Button
                                                        variant="contained"
                                                        onClick={() =>
                                                            handleActionButtonClick(
                                                                repairingRecord.id,
                                                                'repaired',
                                                            )
                                                        }
                                                    >
                                                        <Done fontSize="small" />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Cancel Repairing">
                                                    <Button
                                                        color="error"
                                                        variant="contained"
                                                        onClick={() =>
                                                            handleActionButtonClick(
                                                                repairingRecord.id,
                                                                'cancelled',
                                                            )
                                                        }
                                                    >
                                                        <CloseOutlined fontSize="small" />
                                                    </Button>
                                                </Tooltip>
                                            </Box>
                                        </CardActions>
                                    )}
                                    {repairingRecord.status ===
                                        REPAIRING_STATUS.REPAIRED && (
                                        <Alert severity="success">
                                            {
                                                REPAIRING_STATUS_REVERSE[
                                                    repairingRecord.status
                                                ]
                                            }
                                        </Alert>
                                    )}
                                    {[
                                        REPAIRING_STATUS.UNSERVICEABLE,
                                        REPAIRING_STATUS.CANCELLED,
                                    ].includes(repairingRecord.status) && (
                                        <Alert severity="error">
                                            Marked{' '}
                                            {
                                                REPAIRING_STATUS_REVERSE[
                                                    repairingRecord.status
                                                ]
                                            }
                                        </Alert>
                                    )}
                                    {repairingRecords.length === index + 1 ? (
                                        <Box ref={lastElementRef} />
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                    {isLoading ? (
                        <CardSkeleton count={9} />
                    ) : !repairingRecords.length ? (
                        <Typography variant="h6">No records found.</Typography>
                    ) : null}
                </Masonry>
            </Grid>
            <Modal open={!!modalAction}>
                <ModalStyledBox>
                    <Header variant="h6">{`Mark ${modalAction}`}</Header>
                    <Box sx={{ padding: 4 }}>
                        {modalAction === 'repaired' ? (
                            <TextField
                                label="Actual Repairing Cost"
                                type="number"
                                variant="outlined"
                                fullWidth={true}
                                autoFocus={true}
                                value={actualRepairingCost}
                                error={!isEmpty(errors.actualRepairingCost)}
                                helperText={first(errors.actualRepairingCost)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CurrencyRupeeOutlined fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                                onFocus={() =>
                                    setRepairingStatus(
                                        REPAIRING_STATUS.REPAIRED,
                                    )
                                }
                                onChange={(event) =>
                                    setActualRepairingCost(+event.target.value)
                                }
                            />
                        ) : (
                            <RadioGroup
                                value={repairingStatus}
                                onChange={(event) =>
                                    setRepairingStatus(+event.target.value)
                                }
                            >
                                <FormControlLabel
                                    control={<Radio />}
                                    label={
                                        REPAIRING_STATUS_REVERSE[
                                            REPAIRING_STATUS.UNSERVICEABLE
                                        ]
                                    }
                                    value={REPAIRING_STATUS.UNSERVICEABLE}
                                />
                                <FormControlLabel
                                    control={<Radio />}
                                    label={
                                        REPAIRING_STATUS_REVERSE[
                                            REPAIRING_STATUS.CANCELLED
                                        ]
                                    }
                                    value={REPAIRING_STATUS.CANCELLED}
                                />
                            </RadioGroup>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            padding: 4,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={closeModal}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleStatusUpdate}
                        >
                            Update
                        </Button>
                    </Box>
                </ModalStyledBox>
            </Modal>
            <Fab
                color="primary"
                aria-label="Add Item"
                sx={{ position: 'fixed', bottom: 50, right: 65 }}
                onClick={handleAddItem}
            >
                <Add />
            </Fab>
        </Box>
    );
};

const mapStateToProps = (state: AppState) => ({
    searchValue: state.miscellaneous.searchValue,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    search: bindActionCreators(setSearchValue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repairing);
