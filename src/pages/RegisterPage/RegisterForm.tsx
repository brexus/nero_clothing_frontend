import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form.tsx"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import CircularLoading from "@/components/CircularLoading.tsx";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {Label} from "@/components/ui/label.tsx";
import {registerSchema} from "@/validation/schemas.tsx";

const RegisterForm = () => {
    const {login, loading, user} = useAuth();

    const [emailTakenError, setEmailTakenError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordCorrect, setConfirmPasswordCorrect] = useState(true);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            toast("Registered successfully.", {type: "success"});

            navigate("/login");

        } catch (err: any) {
            console.log(JSON.stringify(err.message));
            setEmailTakenError(err.message);

            // setError(err);
        } finally {
            // setLoading(false);
        }
    }

    useEffect(() => {
        if (form.watch().password !== confirmPassword) {
            setConfirmPasswordCorrect(false);
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordCorrect(true);
            setConfirmPasswordError("");
        }

    }, [form.watch().password, confirmPassword]);

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="pb-4 space-y-4 w-full px-8">
                <h2 className="text-2xl font-bold">Register</h2>

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormControl className={(emailTakenError.length > 0)  ? "border-destructive" : ""} >
                                <Input placeholder="E-mail" {...field} autoComplete="email" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <p className={"mt-[-7px]"}>
                    {emailTakenError &&
                        <Label className={"text-sm font-normal mt-0 text-destructive"}>
                            {emailTakenError}
                        </Label>
                    }
                </p>

                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem >
                            <FormControl className={"mt-[7px]"}>
                                <Input placeholder="First Name" {...field} autoComplete="given-name" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} autoComplete="family-name"/>
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
                                <Input placeholder="Phone Number" {...field} autoComplete="tel" className={"mb-0 "}/>
                            </FormControl>
                            {/*<p className={"text-sm text-gray-600 mb-1 italic"}>*/}
                            {/*    Phone number must */}
                            {/*</p>*/}
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} autoComplete="new-password"/>

                            </FormControl>
                            <FormMessage>
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <Input
                    type="password"
                    placeholder="Confirm Password"
                    className={`mb-2 ${confirmPasswordCorrect ? "" : "border-destructive"}`}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
                <Label className={"text-sm font-normal mt-0 text-destructive"}>
                    {confirmPasswordError}
                </Label>


                <p className={"text-sm text-gray-600"}>
                    Do you have an account? {" "}
                    <Link to="/login" className="text-blue-500 font-bold no-underline ">Login</Link>
                </p>

                <Button
                    type="submit"
                    className={"w-full py-4 cursor-pointer"}
                    disabled={loading}
                >
                    <CircularLoading className={`${loading ? "block animate-spin" : "hidden"}`}/>
                    Register
                </Button>
            </form>
        </Form>
    )
        ;
};

export default RegisterForm;