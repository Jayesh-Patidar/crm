import DatePickerWrapper from '@app/client/@core/styles/libs/react-datepicker';
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { first, get, isEmpty, map } from 'lodash';
import { useAxios } from '@app/client/utils';
import { Fragment, useEffect, useState, MouseEvent } from 'react';
import { Brand, BrandModel, Customer, Issue } from '@app/shared';
import { useRouter } from 'next/router';

type State<K extends string, T> = {
    [key in K]: T[];
} & {
    selectedValue?: T | T[];
    isLoading?: boolean;
};

type Field =
    | 'customerPhone'
    | 'customerName'
    | 'brand'
    | 'issue'
    | 'brandModel';

interface FormData {
    customerId?: number;
    customerPhone?: string;
    customerFirstName?: string;
    customerLastName?: string | null;
    brandId: number;
    brandModelId: number;
    issueIds: number[];
}

type Errors = {
    [key in keyof FormData]?: string[];
};

const AddItem = () => {
    const { axios } = useAxios();
    const router = useRouter();
    const [customerState, setCustomerState] = useState<
        State<'customers', Customer>
    >({
        customers: [],
        isLoading: false,
    });
    const [brandState, setBrandState] = useState<State<'brands', Brand>>({
        brands: [],
        isLoading: false,
    });
    const [issueState, setIssueState] = useState<State<'issues', Issue>>({
        issues: [],
        isLoading: false,
    });
    const [brandModelState, setBrandModelState] = useState<
        State<'brandModels', BrandModel>
    >({
        brandModels: [],
        isLoading: false,
    });
    const [errors, setErrors] = useState<Errors>({
        customerId: [],
        customerPhone: [],
        customerFirstName: [],
        customerLastName: [],
        brandId: [],
        brandModelId: [],
        issueIds: []
    })

    const fetchCustomers = async (searchValue?: string): Promise<void> => {
        setCustomerState({ ...customerState, isLoading: true });

        const url = `customer${
            searchValue ? `?searchValue=${searchValue}` : ''
        }`;
        const { data } = await axios<Customer[]>({
            url,
            method: 'get',
        });

        setCustomerState({ customers: data || [], isLoading: false });
    };

    const fetchBrands = async (searchValue?: string): Promise<void> => {
        setBrandState({ ...brandState, isLoading: true });

        const url = `brand${searchValue ? `?searchValue=${searchValue}` : ''}`;
        const { data } = await axios<Brand[]>({
            url,
            method: 'get',
        });

        setBrandState({ brands: data || [], isLoading: false });
    };

    const fetchIssues = async (searchValue?: string): Promise<void> => {
        setIssueState({ ...issueState, isLoading: true });

        const url = `issue${searchValue ? `?searchValue=${searchValue}` : ''}`;
        const { data } = await axios<Issue[]>({
            url,
            method: 'get',
        });

        setIssueState({ issues: data || [], isLoading: false });
    };

    const fetchBrandModels = async (searchValue?: string): Promise<void> => {
        setBrandModelState({ ...brandModelState, isLoading: true });

        const url = `brand-model?brandId=${get(
            brandState.selectedValue,
            'id',
        )}${searchValue ? `&searchValue=${searchValue}` : ''}`;
        const { data } = await axios<BrandModel[]>({
            url,
            method: 'get',
        });

        setBrandModelState({ brandModels: data || [], isLoading: false });
    };

    useEffect(() => {
        (async () => {
            await Promise.all([fetchCustomers(), fetchBrands(), fetchIssues()]);
        })();
    }, []);

    const handleSearch = async (
        field: Field,
        searchValue: string,
        reason?: string,
    ) => {
        if (reason === 'input') {
            if (field === 'customerPhone') {
                await fetchCustomers(searchValue);
            }

            if (field === 'brand') {
                await fetchBrands(searchValue);
            }

            if (field === 'issue') {
                await fetchIssues(searchValue);
            }

            if (field === 'brandModel') {
                await fetchBrandModels(searchValue);
            }
        }
    };

    const handleValueSelected = async (field: Field, value: string) => {
        if (field === 'customerPhone') {
            const selectedValue = customerState.customers.find(
                (customer) => customer.phone === value,
            ) || {
                id: 0,
                firstName: '',
                lastName: '',
                phone: value as string,
            };

            setCustomerState({
                ...customerState,
                selectedValue,
            });
        }

        if (field === 'customerName') {
            setCustomerState({
                ...customerState,
                selectedValue: {
                    ...customerState.selectedValue,
                    firstName: value,
                },
            });
        }

        if (field === 'brand') {
            setBrandState({
                ...brandState,
                selectedValue: brandState.brands.find(
                    (brand) => brand.brandName === value,
                ),
            });
        }

        if (field === 'issue') {
            setIssueState({
                ...issueState,
                selectedValue: issueState.issues.filter((issue) =>
                    value.split('|').includes(issue.issue),
                ),
            });
        }

        if (field === 'brandModel') {
            setBrandModelState({
                ...brandModelState,
                selectedValue: brandModelState.brandModels.find(
                    (brandModel) => brandModel.modelName === value,
                ),
            });
        }
    };

    const getFullName = (customer: Customer) =>
        customer && customer.firstName && customer.lastName
            ? `${customer.firstName} ${customer.lastName}`
            : (customer && customer.firstName) || '';

    const handleAddItem = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const [customerFirstName, ...customerLastName] = get(
            customerState.selectedValue,
            'firstName',
        ).split(' ');

        const formData: FormData = {
            customerId: get(customerState.selectedValue, 'id') || undefined,
            customerPhone: get(customerState.selectedValue, 'phone'),
            customerFirstName,
            customerLastName: customerLastName.join(' '),
            brandId: get(brandState.selectedValue, 'id'),
            brandModelId: get(brandModelState.selectedValue, 'id'),
            issueIds: map(issueState.selectedValue as Issue[], 'id'),
        };
        const { error } = await axios({
            url: 'repairing',
            method: 'post',
            // data: formData,
        });

        if (error) {
            setErrors(error)
            return;
        }

        router.push('/repairing');
    };

    useEffect(() => {
        (async () =>
            brandState.selectedValue
                ? await fetchBrandModels()
                : setBrandModelState({
                      brandModels: [],
                      selectedValue: null,
                  }))();
    }, [brandState.selectedValue]);

    return (
        <DatePickerWrapper>
            <Card>
                <CardHeader
                    title="Add item"
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <Divider sx={{ margin: 0 }} />
                <form onSubmit={(e) => e.preventDefault()}>
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    1. Customer Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    freeSolo={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Phone"
                                            error={!isEmpty(errors.customerId) || !isEmpty(errors.customerPhone)}
                                            helperText={first(errors.customerId) || !isEmpty(errors.customerPhone)}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'number',
                                                endAdornment: (
                                                    <Fragment>
                                                        {customerState.isLoading ? (
                                                            <CircularProgress
                                                                color="inherit"
                                                                size={20}
                                                            />
                                                        ) : null}
                                                        {
                                                            params.InputProps
                                                                .endAdornment
                                                        }
                                                    </Fragment>
                                                ),
                                            }}
                                            onBlur={(event) =>
                                                handleValueSelected(
                                                    'customerPhone',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    )}
                                    options={customerState.customers.map(
                                        (customer: Customer) => customer.phone,
                                    )}
                                    onInputChange={(event, value, reason) =>
                                        handleSearch(
                                            'customerPhone',
                                            value,
                                            reason,
                                        )
                                    }
                                    onChange={(event, value, reason) =>
                                        handleValueSelected(
                                            'customerPhone',
                                            value,
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth={true}
                                    error={!isEmpty(errors.customerFirstName) || !isEmpty(errors.customerLastName)}
                                    helperText={first(errors.customerFirstName) || !isEmpty(errors.customerLastName)}
                                    disabled={
                                        !get(
                                            customerState.selectedValue,
                                            'phone',
                                        ) ||
                                        get(customerState.selectedValue, 'id')
                                    }
                                    value={getFullName(
                                        customerState.selectedValue as Customer,
                                    )}
                                    onChange={(event) =>
                                        handleValueSelected(
                                            'customerName',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    2. Item Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Brand"
                                            error={!isEmpty(errors.brandId)}
                                            helperText={first(errors.brandId)}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'text',
                                                endAdornment: (
                                                    <Fragment>
                                                        {brandState.isLoading ? (
                                                            <CircularProgress
                                                                color="inherit"
                                                                size={20}
                                                            />
                                                        ) : null}
                                                        {
                                                            params.InputProps
                                                                .endAdornment
                                                        }
                                                    </Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                    options={brandState.brands.map(
                                        (brand) => brand.brandName,
                                    )}
                                    onInputChange={(event, value, reason) =>
                                        handleSearch('brand', value, reason)
                                    }
                                    onChange={(event, value) =>
                                        handleValueSelected('brand', value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Model"
                                            error={!isEmpty(errors.brandModelId)}
                                            helperText={first(errors.brandModelId)}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'text',
                                                endAdornment: (
                                                    <Fragment>
                                                        {brandModelState.isLoading ? (
                                                            <CircularProgress
                                                                color="inherit"
                                                                size={20}
                                                            />
                                                        ) : null}
                                                        {
                                                            params.InputProps
                                                                .endAdornment
                                                        }
                                                    </Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                    options={brandModelState.brandModels.map(
                                        (brandModel) => brandModel.modelName,
                                    )}
                                    onInputChange={(event, value, reason) =>
                                        handleSearch(
                                            'brandModel',
                                            value,
                                            reason,
                                        )
                                    }
                                    onChange={(event, value) =>
                                        handleValueSelected('brandModel', value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    3. Issue Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple={true}
                                    freeSolo={true}
                                    disableCloseOnSelect={true}
                                    limitTags={10}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Issue"
                                            error={!isEmpty(errors.issueIds)}
                                            helperText={first(errors.issueIds)}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'text',
                                                endAdornment: (
                                                    <Fragment>
                                                        {issueState.isLoading ? (
                                                            <CircularProgress
                                                                color="inherit"
                                                                size={20}
                                                            />
                                                        ) : null}
                                                        {
                                                            params.InputProps
                                                                .endAdornment
                                                        }
                                                    </Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                    options={issueState.issues.map(
                                        (issue) => issue.issue,
                                    )}
                                    onInputChange={(event, value, reason) =>
                                        handleSearch('issue', value, reason)
                                    }
                                    onChange={(event, value) =>
                                        handleValueSelected(
                                            'issue',
                                            value.join('|'),
                                        )
                                    }
                                />
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                justifyContent="flex-end"
                            >
                                <Button
                                    size="large"
                                    variant="contained"
                                    disabled={
                                        !customerState.selectedValue ||
                                        !brandState.selectedValue ||
                                        !brandModelState.selectedValue ||
                                        !issueState.selectedValue
                                    }
                                    onClick={handleAddItem}
                                >
                                    Add Item
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </form>
            </Card>
        </DatePickerWrapper>
    );
};

export default AddItem;
