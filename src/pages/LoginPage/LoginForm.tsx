import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form.tsx"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import CircularLoading from "@/components/CircularLoading.tsx";
import {useState} from "react";
import {loginSchema} from "@/validation/schemas.tsx";

const LoginForm = () => {
    const {login, loading, user} = useAuth();

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        console.log(values)

        try {
            const response = await fetch(`http://localhost:5000/api/v1/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            if (!response.ok) {

            }

            await login(values.email, values.password);
            navigate("/profile");

        } catch (err: any) {
            console.log(JSON.stringify(err));
            setError(err.message);
        } finally {
            // setLoading(false);
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full px-8">

                <h2 className="text-2xl font-bold">Login</h2>

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="E-mail"
                                    {...field}
                                    autoComplete="email"
                                    className={error && "border-destructive"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    autoComplete="new-password"
                                    className={error && "border-destructive"}
                                />
                            </FormControl>
                            <FormMessage>
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <p className="text-red-600 text-sm">
                    {error}
                </p>

                <p className={"text-sm text-gray-600"}>
                    Do not have an account? {" "}
                    <Link to="/register" className="text-blue-500 font-bold no-underline ">Register</Link>
                </p>

                <Button
                    type="submit"
                    className={"w-full py-4 cursor-pointer"}
                    disabled={loading}
                >
                    <CircularLoading className={`${loading ? "block animate-spin" : "hidden"}`}/>
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;