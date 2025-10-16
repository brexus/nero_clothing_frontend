import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {Link} from "react-router";
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty"
import {Button} from "@/components/ui/button"
import {Icons} from "@/components/icons.tsx";

const NotFoundPage = () => {
    return (
        <DefaultLayout>
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Icons.TrangleExclamation className="h-10 w-10 fill-current/60"/>
                    </EmptyMedia>
                    <EmptyTitle>404 - Not Found</EmptyTitle>
                    <EmptyDescription>
                        The page you&apos;re looking for doesn&apos;t exist.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button size="sm">
                        <Link to={"/collections/all"}>
                            Go to Shop
                        </Link>
                    </Button>
                </EmptyContent>
            </Empty>

        </DefaultLayout>
    );
};

export default NotFoundPage;