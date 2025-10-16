import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form.tsx"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import CircularLoading from "@/components/CircularLoading.tsx";
import {useState} from "react";

const formSchema = z.object({
    email: z.string()
        .min(5, {message: "Email must be at least 5 characters.",})
        .max(50, {message: "Email must be at most 50 characters.",})
        .email({message: "Invalid email address.",})
        .trim(),
    password: z.string()
        .min(6, {message: "Password must be at least 6 characters.",})
        .max(32, {message: "Password must be at most 32 characters.",})
        .trim(),
})

const LoginForm = () => {
    const {login, loading, user} = useAuth();

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
                // const errorData = await response.json();
                // throw new Error(errorData.message || 'Something went wrong');
            }

            login(values.email, values.password);
            navigate("/profile");

        } catch (err: any) {
            console.log(JSON.stringify(err));
            // setError(err);
        } finally {
            // setLoading(false);
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full px-8">

                <h2 className="text-2xl font-bold">Login</h2>

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
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage>
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className={"w-full py-6 cursor-pointer"}
                    disabled={loading}
                >
                    <CircularLoading className={`${loading ? "block animate-spin" : "hidden"}`}/>
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;