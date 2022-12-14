import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    FilterOptionsState,
    Grid,
    InputAdornment,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { useAxios } from '@app/client/utils';
import {
    MobileDateTimePicker,
    LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
    first,
    get,
    has,
    isArray,
    isEmpty,
    isUndefined,
    last,
    set,
} from 'lodash';
import { Fragment, useEffect, useState, MouseEvent } from 'react';
import {
    Accessory,
    Brand,
    BrandModel,
    Customer,
    DATE_TIME_FORMAT,
    Issue,
    Locality,
    Pagination,
} from '@app/shared';
import DatePickerWrapper from '@app/client/@core/styles/libs/react-datepicker';
import {
    CalendarMonthOutlined,
    CurrencyRupeeOutlined,
    DevicesOutlined,
    FormatBoldOutlined,
    NotesOutlined,
    PersonOutline,
    PhoneOutlined,
    PlaceOutlined,
    QrCodeOutlined,
} from '@mui/icons-material';
import moment from 'moment';

type State<K extends string, T> = {
    [key in K]: T[];
} & {
    pagination?: Pagination<T>['pagination'];
    searchValue: string;
    isLoading?: boolean;
};

type Field =
    | 'customer'
    | 'locality'
    | 'brand'
    | 'issues'
    | 'brandModel'
    | 'accessories'
    | 'pointOfContactPhone'
    | 'pointOfContactName'
    | 'serialNumber'
    | 'additionalInformation'
    | 'expectedReturnDate'
    | 'expectedRepairingCost';

type Key =
    | 'phone'
    | 'localityName'
    | 'brandName'
    | 'modelName'
    | 'issue'
    | 'accessoryName';

interface InputValue {
    inputValue?: any;
}

type MultipleSelectedValues = Array<
    NonNullable<string | Partial<Issue>> & InputValue
>;

type SingleSelectedValue = NonNullable<string | Partial<Customer>> &
    NonNullable<string | Partial<Brand>> &
    NonNullable<string | Partial<BrandModel>> &
    InputValue;

interface Body {
    customer: Partial<Customer>;
    locality: Partial<Locality>;
    brand: Partial<Brand>;
    brandModel: Partial<BrandModel>;
    issues: Partial<Issue>[];
    accessories: Partial<Accessory>[];
    pointOfContactName: string | null;
    pointOfContactPhone: string | null;
    serialNumber: string | null;
    expectedReturnDate: string;
    expectedRepairingCost: number | null;
    additionalInformation: string | null;
}

type Errors = {
    [key in keyof Body]?: string[];
};

const AddItem = () => {
    const { axios } = useAxios();
    const router = useRouter();
    const [customerState, setCustomerState] = useState<
        State<'customers', Customer>
    >({
        customers: [],
        searchValue: '',
        isLoading: false,
    });
    const [localityState, setLocalityState] = useState<
        State<'localities', Locality>
    >({
        localities: [],
        searchValue: '',
        isLoading: false,
    });
    const [brandState, setBrandState] = useState<State<'brands', Brand>>({
        brands: [],
        searchValue: '',
        isLoading: false,
    });
    const [issueState, setIssueState] = useState<State<'issues', Issue>>({
        issues: [],
        searchValue: '',
        isLoading: false,
    });
    const [brandModelState, setBrandModelState] = useState<
        State<'brandModels', BrandModel>
    >({
        brandModels: [],
        searchValue: '',
        isLoading: false,
    });
    const [accessoryState, setAccessoryState] = useState<
        State<'accessories', Accessory>
    >({
        accessories: [],
        searchValue: '',
        isLoading: false,
    });
    const [apiBody, setApiBody] = useState<Body>({
        customer: {},
        locality: {},
        brand: {},
        brandModel: {},
        issues: [],
        accessories: [],
        pointOfContactName: null,
        pointOfContactPhone: null,
        serialNumber: null,
        expectedRepairingCost: null,
        expectedReturnDate: moment().add(1, 'day').toISOString(),
        additionalInformation: null,
    });
    const [isPointOfContactDetailsVisible, setIsPointOfContactDetailsVisible] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({
        customer: [],
        brand: [],
        brandModel: [],
        issues: [],
        accessories: [],
        locality: [],
        pointOfContactName: [],
        pointOfContactPhone: [],
        serialNumber: [],
        expectedReturnDate: [],
        expectedRepairingCost: [],
        additionalInformation: [],
    });

    const fetchCustomers = async (searchValue?: string): Promise<void> => {
        if (isUndefined(searchValue)) {
            setCustomerState({ ...customerState, isLoading: true });
        }

        const url = `customer${
            searchValue ? `?searchValue=${searchValue}` : ''
        }`;

        const { data } = await axios<Pagination<Customer>>({
            url,
            method: 'get',
        });

        setCustomerState({
            customers: get(data, 'records', []),
            pagination: get(data, 'pagination', null),
            searchValue: searchValue || '',
            isLoading: false,
        });
    };

    const fetchLocalities = async (searchValue?: string): Promise<void> => {
        if (isUndefined(searchValue)) {
            setLocalityState({ ...localityState, isLoading: true });
        }

        const url = `locality${
            searchValue ? `?searchValue=${searchValue}` : ''
        }`;

        const { data } = await axios<Pagination<Locality>>({
            url,
            method: 'get',
        });

        setLocalityState({
            localities: get(data, 'records', []),
            pagination: get(data, 'pagination', null),
            searchValue: searchValue || '',
            isLoading: false,
        });
    };

    const fetchBrands = async (searchValue?: string): Promise<void> => {
        if (isUndefined(searchValue)) {
            setBrandState({ ...brandState, isLoading: true });
        }

        const url = `brand${searchValue ? `?searchValue=${searchValue}` : ''}`;

        const { data } = await axios<Pagination<Brand>>({
            url,
            method: 'get',
        });

        setBrandState({
            brands: get(data, 'records', []),
            pagination: get(data, 'pagination', null),
            searchValue: searchValue || '',
            isLoading: false,
        });
    };

    const fetchIssues = async (searchValue?: string): Promise<void> => {
        if (isUndefined(searchValue)) {
            setIssueState({ ...issueState, isLoading: true });
        }

        const url = `issue${searchValue ? `?searchValue=${searchValue}` : ''}`;

        const { data } = await axios<Pagination<Issue>>({
            url,
            method: 'get',
        });

        setIssueState({
            issues: get(data, 'records', []),
            pagination: get(data, 'pagination', null),
            searchValue: searchValue || '',
            isLoading: false,
        });
    };

    const fetchAccessories = async (searchValue?: string): Promise<void> => {
        if (isUndefined(searchValue)) {
            setAccessoryState({ ...accessoryState, isLoading: true });
        }

        const url = `accessory${
            searchValue ? `?searchValue=${searchValue}` : ''
        }`;

        const { data } = await axios<Pagination<Accessory>>({
            url,
            method: 'get',
        });

        setAccessoryState({
            accessories: get(data, 'records', []),
            pagination: get(data, 'pagination', null),
            searchValue: searchValue || '',
            isLoading: false,
        });
    };

    const fetchBrandModels = async (searchValue?: string): Promise<void> => {
        if (isUndefined(searchValue)) {
            setBrandModelState({ ...brandModelState, isLoading: true });
        }

        const url = `brand-model?brandId=${get(apiBody.brand, 'id', 0)}${
            searchValue ? `&searchValue=${searchValue}` : ''
        }`;

        const { data } = await axios<Pagination<BrandModel>>({
            url,
            method: 'get',
        });

        setBrandModelState({
            brandModels: get(data, 'records', []),
            pagination: get(data, 'pagination', null),
            searchValue: searchValue || '',
            isLoading: false,
        });
    };

    useEffect(() => {
        (async () => {
            await Promise.all([
                fetchCustomers(),
                fetchLocalities(),
                fetchBrands(),
                fetchIssues(),
                fetchAccessories(),
            ]);
        })();
    }, []);

    const getOptionLabel = <T,>(option: T, key: Key): string => {
        if (typeof option === 'string') {
            return option;
        }

        if (key === 'phone' && option[key] && isEmpty(apiBody.customer)) {
            return `${option[key]} ${get(option, 'firstName', '')} ${get(
                option,
                'lastName',
                '',
            )}`;
        }

        return option[key] || '';
    };

    const filterOptions = <T,>(
        options: T[],
        params: FilterOptionsState<T>,
        key: Key,
    ): T[] => {
        const filtered = options;

        const { inputValue } = params;

        const isExisting = !!filtered.length;

        (async () => {
            if (
                key === 'phone' &&
                customerState.searchValue !== inputValue &&
                (isExisting ||
                    customerState.searchValue.length > inputValue.length)
            ) {
                await fetchCustomers(inputValue);
            }

            if (
                key === 'localityName' &&
                localityState.searchValue !== inputValue &&
                (isExisting ||
                    localityState.searchValue.length > inputValue.length)
            ) {
                await fetchLocalities(inputValue);
            }

            if (
                key === 'brandName' &&
                brandState.searchValue !== inputValue &&
                (isExisting ||
                    brandState.searchValue.length > inputValue.length)
            ) {
                await fetchBrands(inputValue);
            }

            if (
                key === 'modelName' &&
                brandModelState.searchValue !== inputValue &&
                (isExisting ||
                    brandModelState.searchValue.length > inputValue.length)
            ) {
                await fetchBrandModels(inputValue);
            }

            if (
                key === 'issue' &&
                issueState.searchValue !== inputValue &&
                (isExisting ||
                    issueState.searchValue.length > inputValue.length)
            ) {
                await fetchIssues(inputValue);
            }

            if (
                key === 'accessoryName' &&
                accessoryState.searchValue !== inputValue &&
                (isExisting ||
                    accessoryState.searchValue.length > inputValue.length)
            ) {
                await fetchAccessories(inputValue);
            }
        })();

        if (inputValue !== '' && !isExisting) {
            filtered.push({
                [key]:
                    key === 'phone' && !/[0-9]/g.test(inputValue)
                        ? `Add new phone`
                        : `Add "${inputValue}"`,
                inputValue,
            } as T);
        }

        return filtered;
    };

    const handleChange = async (key: Field, value: SingleSelectedValue) => {
        let data: any = value;

        if (key === 'customer') {
            if (typeof value === 'string') {
                const isPhoneNumber = /[0-9]/g.test(value);

                data = isPhoneNumber
                    ? { phone: '' }
                    : { firstName: '', lastName: '' };
            } else if (value && !isUndefined(value.inputValue)) {
                const isPhoneNumber = /[0-9]/g.test(value.inputValue);

                const [firstName, lastName] = !isPhoneNumber
                    ? /\s\w/.test(value.inputValue)
                        ? value.inputValue.split(/(?<=^\S+)\s/)
                        : [value.inputValue]
                    : [];

                data = isPhoneNumber
                    ? {
                          ...apiBody.customer,
                          phone: value.inputValue,
                      }
                    : {
                          ...apiBody.customer,
                          firstName,
                          lastName,
                      };
            }
        }

        if (key === 'locality') {
            if (typeof value === 'string') {
                data = { localityName: '' };
            } else if (value && !isUndefined(value.inputValue)) {
                data = {
                    localityName: value.inputValue,
                };
                console.log(data);
            }
        }

        if (key === 'pointOfContactPhone') {
            if (typeof value === 'string') {
                data = '';
            } else if (value && !isUndefined(value.inputValue)) {
                data = value.inputValue;
            }
        }

        if (key === 'pointOfContactName') {
            if (typeof value === 'string') {
                data = '';
            } else if (value && !isUndefined(value.inputValue)) {
                data = value.inputValue;
            }
        }

        if (key === 'brand') {
            if (typeof value === 'string') {
                data = { brandName: '' };
            } else if (value && !isUndefined(value.inputValue)) {
                data = {
                    brandName: value.inputValue,
                };
            }
        }

        if (key === 'brandModel') {
            if (typeof value === 'string') {
                data = { modelName: '' };
            } else if (value && !isUndefined(value.inputValue)) {
                data = {
                    brandId: get(apiBody, 'brand.id', 0),
                    modelName: value.inputValue,
                };
            }
        }

        if (key === 'serialNumber') {
            if (typeof value === 'string') {
                data = '';
            } else if (value && !isUndefined(value.inputValue)) {
                data = value.inputValue;
            }
        }

        if (key === 'expectedReturnDate') {
            if (typeof value === 'string') {
                data = '';
            } else if (value && !isUndefined(value.inputValue)) {
                data = value.inputValue.toISOString();
            }
        }

        if (key === 'expectedRepairingCost') {
            if (typeof value === 'string') {
                data = '';
            } else if (value && !isUndefined(value.inputValue)) {
                data = value.inputValue;
            }
        }

        if (key === 'additionalInformation') {
            if (typeof value === 'string') {
                data = '';
            } else if (value && !isUndefined(value.inputValue)) {
                data = value.inputValue;
            }
        }

        setApiBody({
            ...apiBody,
            [key]: data,
        });
    };

    const handleMultipleChange = (
        key: Field,
        values: MultipleSelectedValues,
    ) => {
        const data = values;

        if (key === 'issues') {
            const lastIssue = last(values);
            if (typeof lastIssue === 'string') {
                values.pop();
            } else if (values.length && !isUndefined(lastIssue.inputValue)) {
                last(data)['issue'] = lastIssue.inputValue;
                delete last(data).inputValue;
            }
        }

        if (key === 'accessories') {
            const lastAccessory = last(values);
            if (typeof lastAccessory === 'string') {
                values.pop();
            } else if (
                values.length &&
                !isUndefined(lastAccessory.inputValue)
            ) {
                last(data)['accessoryName'] = lastAccessory.inputValue;
                delete last(data).inputValue;
            }
        }

        setApiBody({
            ...apiBody,
            [key]: data,
        });
    };

    const getFullName = (customer: Partial<Customer>) =>
        customer && customer.firstName && !isUndefined(customer.lastName)
            ? `${customer.firstName} ${customer.lastName}`
            : (customer && customer.firstName) || '';

    const formatErrorObject = (errors: Record<string, string[]>): Errors => {
        const response: Errors = {};

        Object.entries(errors).forEach(([key, value]) => {
            set(response, key, value);
        });
        return response;
    };

    const handleAddItem = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setIsLoading(true);

        const { error } = await axios({
            url: 'repairing',
            method: 'post',
            data: apiBody,
        });

        setIsLoading(false);

        if (error) {
            setErrors(formatErrorObject(error));
            return;
        }

        redirectToRepairingListing(event);
    };

    const redirectToRepairingListing = (
        event: MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        router.push('/repairing');
    };

    const togglePointOfContactDetailsVisibility = () => {
        setIsPointOfContactDetailsVisible(!isPointOfContactDetailsVisible);
    };

    useEffect(() => {
        (async () =>
            get(apiBody.brand, 'id')
                ? await fetchBrandModels()
                : setBrandModelState({
                      brandModels: [],
                      searchValue: '',
                  }))();
    }, [apiBody.brand]);

    return (
        <DatePickerWrapper>
            <Card>
                <CardHeader
                    title="Add Repairing"
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
                                    value={apiBody.customer}
                                    options={customerState.customers}
                                    getOptionLabel={(option) =>
                                        getOptionLabel(option, 'phone')
                                    }
                                    filterOptions={(options, state) =>
                                        filterOptions(options, state, 'phone')
                                    }
                                    onChange={(event, value) =>
                                        handleChange('customer', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Phone"
                                            error={
                                                !isEmpty(errors.customer) ||
                                                has(errors, 'customer.phone')
                                            }
                                            helperText={first(
                                                isArray(get(errors, 'customer'))
                                                    ? get(errors, 'customer')
                                                    : get(
                                                          errors,
                                                          'customer.phone',
                                                      ),
                                            )}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'text',
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneOutlined
                                                            fontSize="small"
                                                            color="primary"
                                                        />
                                                    </InputAdornment>
                                                ),
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
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth={true}
                                    error={
                                        has(errors, 'customer.firstName') ||
                                        has(errors, 'customer.lastName')
                                    }
                                    helperText={
                                        first(
                                            get(errors, 'customer.firstName'),
                                        ) ||
                                        first(get(errors, 'customer.lastName'))
                                    }
                                    disabled={
                                        isEmpty(apiBody.customer) ||
                                        !!get(apiBody.customer, 'id')
                                    }
                                    value={getFullName(apiBody.customer)}
                                    onChange={(event) =>
                                        handleChange('customer', {
                                            inputValue: event.target.value,
                                        })
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutline
                                                    fontSize="small"
                                                    color="primary"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Typography variant="body2">
                                        Is different Point of Contact?
                                    </Typography>
                                    <Typography variant="body2">No</Typography>
                                    <Switch
                                        onChange={
                                            togglePointOfContactDetailsVisibility
                                        }
                                        checked={isPointOfContactDetailsVisible}
                                    />
                                    <Typography variant="body2">Yes</Typography>
                                </Stack>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                display={
                                    isPointOfContactDetailsVisible
                                        ? null
                                        : 'none'
                                }
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    1.1 Point of Contact Details
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                display={
                                    isPointOfContactDetailsVisible
                                        ? null
                                        : 'none'
                                }
                            >
                                <TextField
                                    label="Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth={true}
                                    error={!isEmpty(errors.pointOfContactName)}
                                    helperText={first(
                                        errors.pointOfContactName,
                                    )}
                                    value={apiBody.pointOfContactName || ''}
                                    onChange={(event) =>
                                        handleChange('pointOfContactName', {
                                            inputValue: event.target.value,
                                        })
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutline
                                                    fontSize="small"
                                                    color="primary"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                display={
                                    isPointOfContactDetailsVisible
                                        ? null
                                        : 'none'
                                }
                            >
                                <TextField
                                    label="Phone"
                                    type="number"
                                    variant="outlined"
                                    fullWidth={true}
                                    error={!isEmpty(errors.pointOfContactPhone)}
                                    helperText={first(
                                        errors.pointOfContactPhone,
                                    )}
                                    value={apiBody.pointOfContactPhone || ''}
                                    onChange={(event) =>
                                        handleChange('pointOfContactPhone', {
                                            inputValue: event.target.value,
                                        })
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneOutlined
                                                    fontSize="small"
                                                    color="primary"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    freeSolo={true}
                                    value={apiBody.locality}
                                    options={localityState.localities}
                                    getOptionLabel={(option) =>
                                        getOptionLabel(option, 'localityName')
                                    }
                                    filterOptions={(options, state) =>
                                        filterOptions(
                                            options,
                                            state,
                                            'localityName',
                                        )
                                    }
                                    onChange={(event, value) =>
                                        handleChange('locality', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Locality"
                                            error={!isEmpty(errors.locality)}
                                            helperText={first(errors.locality)}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'text',
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PlaceOutlined
                                                            fontSize="small"
                                                            color="primary"
                                                        />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <Fragment>
                                                        {localityState.isLoading ? (
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
                                    freeSolo={true}
                                    value={apiBody.brand}
                                    options={brandState.brands}
                                    getOptionLabel={(option) =>
                                        getOptionLabel(option, 'brandName')
                                    }
                                    filterOptions={(options, state) =>
                                        filterOptions(
                                            options,
                                            state,
                                            'brandName',
                                        )
                                    }
                                    onChange={(event, value) =>
                                        handleChange('brand', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Brand"
                                            error={!isEmpty(errors.brand)}
                                            helperText={first(errors.brand)}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'text',
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FormatBoldOutlined
                                                            fontSize="small"
                                                            color="primary"
                                                        />
                                                    </InputAdornment>
                                                ),
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    freeSolo={true}
                                    value={apiBody.brandModel}
                                    options={brandModelState.brandModels}
                                    getOptionLabel={(option) =>
                                        getOptionLabel(option, 'modelName')
                                    }
                                    filterOptions={(option, state) =>
                                        filterOptions(
                                            option,
                                            state,
                                            'modelName',
                                        )
                                    }
                                    onChange={(event, value) =>
                                        handleChange('brandModel', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Model"
                                            error={!isEmpty(errors.brandModel)}
                                            helperText={first(
                                                errors.brandModel,
                                            )}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'text',
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DevicesOutlined
                                                            fontSize="small"
                                                            color="primary"
                                                        />
                                                    </InputAdornment>
                                                ),
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
                                    value={apiBody.issues}
                                    options={issueState.issues}
                                    getOptionLabel={(option) =>
                                        getOptionLabel(option, 'issue')
                                    }
                                    filterOptions={(option, state) =>
                                        filterOptions(option, state, 'issue')
                                    }
                                    onChange={(event, value) =>
                                        handleMultipleChange('issues', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Issues"
                                            error={!isEmpty(errors.issues)}
                                            helperText={first(errors.issues)}
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    4. Other Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Serial Number"
                                    type="text"
                                    variant="outlined"
                                    fullWidth={true}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <QrCodeOutlined
                                                    fontSize="small"
                                                    color="primary"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={apiBody.serialNumber || ''}
                                    error={!isEmpty(errors.serialNumber)}
                                    helperText={first(errors.serialNumber)}
                                    onChange={(event) =>
                                        handleChange('serialNumber', {
                                            inputValue: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                >
                                    <MobileDateTimePicker
                                        disablePast={true}
                                        value={apiBody.expectedReturnDate}
                                        onChange={(value) =>
                                            handleChange('expectedReturnDate', {
                                                inputValue: value,
                                            })
                                        }
                                        label="Expected Return Date"
                                        inputFormat={DATE_TIME_FORMAT}
                                        mask="____/__/__ __:__ _M"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth={true}
                                                error={
                                                    !isEmpty(
                                                        errors.expectedReturnDate,
                                                    )
                                                }
                                                helperText={first(
                                                    errors.expectedReturnDate,
                                                )}
                                            />
                                        )}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarMonthOutlined
                                                        fontSize="small"
                                                        color="primary"
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Expected Repairing Cost"
                                    type="number"
                                    variant="outlined"
                                    fullWidth={true}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CurrencyRupeeOutlined
                                                    fontSize="small"
                                                    color="primary"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={apiBody.expectedRepairingCost || ''}
                                    error={
                                        !isEmpty(errors.expectedRepairingCost)
                                    }
                                    helperText={first(
                                        errors.expectedRepairingCost,
                                    )}
                                    onChange={(event) =>
                                        handleChange('expectedRepairingCost', {
                                            inputValue: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Additional Information"
                                    type="text"
                                    variant="outlined"
                                    fullWidth={true}
                                    multiline={true}
                                    maxRows={2}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NotesOutlined
                                                    fontSize="small"
                                                    color="primary"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={apiBody.additionalInformation || ''}
                                    error={
                                        !isEmpty(errors.additionalInformation)
                                    }
                                    helperText={first(
                                        errors.additionalInformation,
                                    )}
                                    onChange={(event) =>
                                        handleChange('additionalInformation', {
                                            inputValue: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple={true}
                                    freeSolo={true}
                                    disableCloseOnSelect={true}
                                    limitTags={10}
                                    value={apiBody.accessories}
                                    options={accessoryState.accessories}
                                    getOptionLabel={(option) =>
                                        getOptionLabel(option, 'accessoryName')
                                    }
                                    filterOptions={(option, state) =>
                                        filterOptions(
                                            option,
                                            state,
                                            'accessoryName',
                                        )
                                    }
                                    onChange={(event, value) =>
                                        handleMultipleChange(
                                            'accessories',
                                            value,
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Accessories"
                                            error={!isEmpty(errors.accessories)}
                                            helperText={first(
                                                errors.accessories,
                                            )}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'text',
                                                endAdornment: (
                                                    <Fragment>
                                                        {accessoryState.isLoading ? (
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
                                />
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                justifyContent="space-between"
                            >
                                <Button
                                    size="large"
                                    color="error"
                                    variant="outlined"
                                    onClick={redirectToRepairingListing}
                                >
                                    Cancel
                                </Button>
                                <LoadingButton
                                    size="large"
                                    variant="contained"
                                    loading={isLoading}
                                    disabled={
                                        !apiBody.customer ||
                                        !apiBody.customer.firstName ||
                                        !apiBody.brand ||
                                        !apiBody.brandModel ||
                                        !apiBody.issues ||
                                        !apiBody.expectedRepairingCost
                                    }
                                    onClick={handleAddItem}
                                >
                                    Add Item
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </form>
            </Card>
        </DatePickerWrapper>
    );
};

export default AddItem;
