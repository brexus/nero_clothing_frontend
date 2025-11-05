import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.tsx"
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import ProductPriceText from "@/components/ProductPriceText.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import {orderSchema} from "@/validation/schemas.tsx";

const CheckoutForm = ({cartItems, shippingCost}) => {
    const [countries, setCountries] = useState(null);

    const navigation = useNavigate();

    const {token, user, isAuthenticated} = useAuth();
    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (user && isAuthenticated) {
            form.setValue("firstName", user.firstName ?? "");
            form.setValue("lastName", user.lastName ?? "");
            form.setValue("email", user.email ?? "");
        }
    }, [user, isAuthenticated]);

    const schema = orderSchema(!!isAuthenticated);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            paymentMethod: "",
            street: "",
            building: "",
            apartment: "",
            zipCode: "",
            city: "",
            country: "Poland",
            terms: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        console.log(values)

        let newItems = [];
        newItems = cartItems.map((item) => {
            return {
                productVariantId: item.productVariantId,
                quantity: item.quantity,
            }
        });
        console.log(newItems);

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (isAuthenticated && token) {
            headers['Authorization'] = `Bearer ${token}`;
            console.log("Added auth header");
        }

        try {
            const response = await fetch(`http://localhost:5000/api/v1/order/${isAuthenticated ? "auth" : "guest"}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    paymentMethod: values.paymentMethod,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber.trim(),
                    email: isAuthenticated ? user.email : values.email.trim(),
                    shippingAddress: {
                        street: values.street,
                        building: values.building,
                        apartment: values.apartment,
                        zipCode: values.zipCode,
                        city: values.city,
                        country: values.country,
                    },
                    items: newItems

                }),
            });

            if (!response.ok) {
                throw new Error('Błąd pobierania produktu');
            }

            const data = await response.json();

            localStorage.clear();

            toast("Order placed successfully!", {type: "success"});

            navigation("/");

        } catch (err: any) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }


    const fetchCountries = async () => {
        const response = await fetch(`https://restcountries.com/v3.1/region/europe?fields=name`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Błąd pobierania produktu');
        }

        const data = await response.json();
        const names = data.map(c => c.name.common).sort();
        setCountries(names);
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full px-8">
                {!isAuthenticated && (
                    <p className={"text-sm text-gray-600"}>
                        You are placing an order as a guest. We recommend{' '}
                        <a href="/login" className="text-blue-600 underline">
                            logging in.
                        </a>{' '}
                    </p>
                )}

                <h2 className="text-2xl font-bold">Contact</h2>

                {!isAuthenticated && (
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="E-mail"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                )}

                {isAuthenticated && (
                    <Input
                        className={isAuthenticated ? "" : "bg-gray-400 cursor-not-allowed"}
                        disabled={isAuthenticated}
                        placeholder={isAuthenticated ? ((user != null) ? user.email : "") : "E-mail"}
                    />

                )}

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Phone number" {...field} />

                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <h2 className="text-2xl font-bold ">Delivery</h2>

                {/* napisz po angielsku że dostawy są tylko na terytorium europy*/}
                <p className={"text-sm text-gray-600"}>
                    We currently only deliver within Europe.
                </p>

                <FormField
                    control={form.control}
                    name="country"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select payment method"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countries && countries.map((country) => (
                                            <SelectItem value={country} key={country}>
                                                {country}
                                            </SelectItem>
                                        ))}

                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className={"flex flex-row gap-4"}>

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormControl>
                                    <Input placeholder="First name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormControl>
                                    <Input placeholder="Last name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                </div>

                <FormField
                    control={form.control}
                    name="street"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Street" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="building"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Building" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="apartment"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Apartment (Optional)" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className={"flex flex-row gap-4"}>
                    <FormField
                        control={form.control}
                        name="zipCode"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormControl>
                                    <Input placeholder="Zip code" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormControl>
                                    <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <h2 className="text-2xl font-bold">Payment method</h2>

                <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({field}) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select payment method"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="blik">
                                        <img src={"/payment_method/blik2.png"}
                                             className={""} alt="BLIK logo" width={25}/>
                                        BLIK
                                    </SelectItem>

                                    <SelectItem value="applePay">
                                        <img src={"./payment_method/apple-pay-logo2.png"}
                                             className={""} alt="BLIK logo" width={25}/>
                                        Apple Pay
                                    </SelectItem>

                                    <SelectItem value="bankTransfer">
                                        <img src={"./payment_method/mastercard-visa-logo.webp"}
                                             className={""} alt="BLIK logo" width={25}/>
                                        Bank transfer
                                    </SelectItem>

                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <h2 className="text-2xl font-bold">Shipping method</h2>
                <div className={""}>
                    <div className={"flex flex-row items-center justify-start gap-2 mb-2"}>
                        <p className={"flex flex-row gap-1"}>
                            Shipping cost:
                        </p>
                        <ProductPriceText
                            productPrice={shippingCost}
                            className={"font-bold"}
                        />
                    </div>

                    <p className={"text-sm text-gray-600"}>
                        All orders over $300 qualify for free shipping.
                    </p>
                </div>

                <h2 className="text-2xl font-bold">Terms and conditions</h2>

                <FormField
                    control={form.control}
                    name="terms"
                    render={({field}) => (
                        <FormItem className={"w-full"}>
                            <div className="flex flex-row items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-semibold ">
                                    Accept terms and conditions
                                </FormLabel>
                            </div>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className={"w-full py-6 cursor-pointer"}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default CheckoutForm;