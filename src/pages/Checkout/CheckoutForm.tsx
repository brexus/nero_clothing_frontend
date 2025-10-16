import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.tsx"
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import ProductPriceText from "@/components/ProductPriceText.tsx";


const formSchema = z.object({
    email: z.string()
        .min(2, {message: "Email must be at least 2 characters.",})
        .trim()
        .email({message: "Invalid email address.",}),

    phoneNumber: z.preprocess(
        (val) => typeof val === "string" ? val.replace(/\s+/g, "") : val,
        z.string()
            .min(9, {message: "Phone number must be at least 9 digits."})
            .regex(/^\+?[0-9]{9,15}$/, {message: "Invalid phone number format."})
    ),

    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),

    paymentMethod: z.string().min(2, {
        message: "Payment method must be at least 2 characters.",
    }),
    building: z.string().min(1, {
        message: "Building number must be at least 1.",
    }),
    street: z.string().min(2, {
        message: "Street must be at least 2 characters.",
    }),
    apartment: z.string(),
    zipCode: z.string().min(2, {
        message: "Zip code must be at least 2 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
    country: z.string().min(2, {
        message: "Country must be at least 2 characters.",
    }),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
    }),

})

const CheckoutForm = ({cartItems, shippingCost}) => {

    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    const navigation = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
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
            country: "",

            terms: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log(values)

        let newItems = [];
        newItems = cartItems.map((item) => {
            return {
                productVariantId: item.productVariantId,
                quantity: item.quantity,
            }
        });
        console.log(newItems);


        try {
            const response = await fetch(`http://localhost:5000/api/v1/order/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethod: values.paymentMethod,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber.trim(),
                    email: values.email,
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

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full px-8">
                <h2 className="text-2xl font-bold">Contact</h2>

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="E-mail" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

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

                <FormField
                    control={form.control}
                    name="country"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Country" {...field} />
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
                                <Input placeholder="Apartment" {...field} />
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
                            {/*<FormLabel>Payment method</FormLabel>*/}
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
                    <p className={"mb-2 flex flex-row gap-1"}>
                        Shipping cost:
                        <ProductPriceText
                            productPrice={shippingCost}
                            className={"font-bold"}
                        />
                    </p>

                    <p className={"text-sm text-gray-600"}>All orders over $300 qualify for free shipping.</p>
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