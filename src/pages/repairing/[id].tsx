import { useAxios } from '@app/client/utils';
import {
    getFormattedAmount,
    getFormattedDateAndTime,
    getFullName,
    RepairingDetails,
    REPAIRING_STATUS,
    REPAIRING_STATUS_REVERSE,
} from '@app/shared';
import {
    CalendarMonthOutlined,
    CheckOutlined,
    ClearOutlined,
    CurrencyRupeeOutlined,
    DevicesOutlined,
    FormatBoldOutlined,
    PendingOutlined,
    PersonOutline,
    PhoneOutlined,
    PlaceOutlined,
    QrCodeOutlined,
    ReceiptOutlined,
} from '@mui/icons-material';
import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { padStart } from 'lodash';
import { useRouter } from 'next/router';
import { useState, useEffect, forwardRef, Ref } from 'react';

interface Props {
    repairingId?: number;
}

const RepairingDetails = forwardRef(
    (props: Props, ref: Ref<HTMLDivElement>) => {
        const router = useRouter();
        const { id } = router.query;

        const { repairingId = id } = props;

        const { axios } = useAxios();

        const [repairingDetails, setRepairingDetails] =
            useState<RepairingDetails>();

        useEffect(() => {
            if (repairingId) {
                (async () => {
                    const { data } = await axios<RepairingDetails>({
                        url: `repairing/${repairingId}`,
                        method: 'get',
                    });

                    setRepairingDetails(data);
                })();
            }
        }, [repairingId]);

        return (
            <Card ref={ref}>
                <CardHeader
                    title="Repairing Details"
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <Divider sx={{ margin: 0 }} />
                {repairingDetails && (
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12} alignSelf="flex-end">
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    spacing={2}
                                >
                                    <Stack direction="row" spacing={2}>
                                        <ReceiptOutlined
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            Invoice Number:{' '}
                                            {`#${padStart(
                                                `${repairingDetails.id}`,
                                                4,
                                                '0',
                                            )}`}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <CalendarMonthOutlined
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            Collection Date:{' '}
                                            {getFormattedDateAndTime(
                                                repairingDetails.createdAt,
                                            )}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    1. Customer Details
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Stack
                                    direction="column"
                                    justifyContent="space-around"
                                    spacing={2}
                                >
                                    <Stack direction="row" spacing={2}>
                                        <PersonOutline
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            Customer Name:{' '}
                                            {getFullName(
                                                repairingDetails.customer,
                                            )}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <PhoneOutlined
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            Customer Phone:{' '}
                                            {repairingDetails.customer.phone}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            {repairingDetails.pointOfContactName &&
                            repairingDetails.pointOfContactPhone ? (
                                <Grid item xs={6} sm={6}>
                                    <Stack
                                        direction="column"
                                        justifyContent="space-around"
                                        spacing={2}
                                    >
                                        <Stack direction="row" spacing={2}>
                                            <PersonOutline
                                                fontSize="small"
                                                color="primary"
                                            />
                                            <Typography variant="body2">
                                                Point of Contact Name:{' '}
                                                {
                                                    repairingDetails.pointOfContactName
                                                }
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <PhoneOutlined
                                                fontSize="small"
                                                color="primary"
                                            />
                                            <Typography variant="body2">
                                                Point of Contact Phone:{' '}
                                                {
                                                    repairingDetails.pointOfContactPhone
                                                }
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            ) : null}
                            <Grid item xs={12} sm={12}>
                                <Stack direction="row" spacing={2}>
                                    <PlaceOutlined
                                        fontSize="small"
                                        color="primary"
                                    />
                                    <Typography variant="body2">
                                        Locality:{' '}
                                        {repairingDetails.locality.localityName}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    2. Item Details
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    3. Other Details
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Stack
                                    direction="column"
                                    justifyContent="space-around"
                                    spacing={2}
                                >
                                    <Stack direction="row" spacing={2}>
                                        <FormatBoldOutlined
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            Brand:{' '}
                                            {repairingDetails.brand.brandName}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <DevicesOutlined
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            Model:{' '}
                                            {
                                                repairingDetails.brandModel
                                                    .modelName
                                            }
                                        </Typography>
                                    </Stack>
                                    {repairingDetails.serialNumber ? (
                                        <Stack direction="row" spacing={2}>
                                            <QrCodeOutlined
                                                fontSize="small"
                                                color="primary"
                                            />
                                            <Typography variant="body2">
                                                Serial Number:{' '}
                                                {repairingDetails.serialNumber}
                                            </Typography>
                                        </Stack>
                                    ) : null}
                                </Stack>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Stack
                                    direction="column"
                                    justifyContent="space-around"
                                    spacing={2}
                                >
                                    <Stack direction="row" spacing={2}>
                                        <CalendarMonthOutlined
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            {repairingDetails.actualReturnDate
                                                ? 'Actual Return Date'
                                                : 'Expected Return Date'}
                                            :{' '}
                                            {getFormattedDateAndTime(
                                                repairingDetails.actualReturnDate ||
                                                    repairingDetails.expectedReturnDate,
                                            )}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <CurrencyRupeeOutlined
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            {repairingDetails.actualRepairingCost
                                                ? 'Actual Repairing Cost'
                                                : 'Expected Repairing Cost'}
                                            :{' '}
                                            {getFormattedAmount(
                                                +repairingDetails.actualRepairingCost ||
                                                    +repairingDetails.expectedRepairingCost,
                                            )}{' '}
                                            /-
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        {repairingDetails.status ===
                                        REPAIRING_STATUS.PENDING ? (
                                            <PendingOutlined
                                                fontSize="small"
                                                color="primary"
                                            />
                                        ) : repairingDetails.status ===
                                          REPAIRING_STATUS.REPAIRED ? (
                                            <CheckOutlined
                                                fontSize="small"
                                                color="primary"
                                            />
                                        ) : (
                                            <ClearOutlined
                                                fontSize="small"
                                                color="primary"
                                            />
                                        )}
                                        <Typography variant="body2">
                                            Status:{' '}
                                            {
                                                REPAIRING_STATUS_REVERSE[
                                                    repairingDetails.status
                                                ]
                                            }
                                            {repairingDetails.remarks
                                                ? ` - "${repairingDetails.remarks}"`
                                                : ''}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    4. Issues Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {repairingDetails.issues.map((issue, index) => (
                                    <Chip
                                        key={index}
                                        sx={{ margin: 1 }}
                                        label={issue.issue}
                                        variant="outlined"
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                )}
            </Card>
        );
    },
);

export default RepairingDetails;
