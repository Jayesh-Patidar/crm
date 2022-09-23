import { useAxios } from '@app/client/utils';
import { RepairingRecord } from '@app/shared';
import {
    AddShoppingCart,
    CalendarMonthOutlined,
    CurrencyRupeeOutlined,
} from '@mui/icons-material';
import {
    Box,
    BoxProps,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Grid,
    styled,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const Repairing = () => {
    const { axios } = useAxios();
    const [repairingRecords, setRepairingRecords] =
        useState<RepairingRecord[]>([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios<RepairingRecord[]>({
                method: 'get',
                url: 'repairing',
            });

            setRepairingRecords(data);
        })();
    }, []);

    return (
        <Grid container spacing={6}>
            {repairingRecords.map(repairingRecord => <Grid item xs={12} sm={4} lg={4}>
                <Card>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <CardContent sx={{ paddingBottom: 0 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ marginBottom: 2 }}
                                >
                                    {repairingRecord.brand.brandName} - {repairingRecord.brandModel.modelName}
                                </Typography>
                                {repairingRecord.issues.map(issue => <Chip sx={{ margin: 1 }} label={issue.issue} />)}
                                <Divider
                                    sx={{ marginTop: 3.5, marginBottom: 3.5 }}
                                />
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={12} lg={6}>
                                        <StyledBox>
                                            <Box
                                                sx={{
                                                    mb: 6.75,
                                                    display: 'flex',
                                                    alignItem: 'center',
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
                                                    1 Oct 2022
                                                </Typography>
                                            </Box>
                                        </StyledBox>
                                    </Grid>
                                    <Grid item xs={12} sm={12} lg={6}>
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
                                                1 Oct 2022
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions className="card-action-dense">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                >
                                    <Button fullWidth variant="contained">
                                        <AddShoppingCart
                                            fontSize="small"
                                            sx={{ marginRight: 2 }}
                                        />
                                        Add to cart
                                    </Button>
                                </Box>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>)}
        </Grid>
    );
};

export default Repairing;
