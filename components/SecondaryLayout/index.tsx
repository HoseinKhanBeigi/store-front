import Nav from "../Navigation";
export const SecondaryLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <h1>Secondrylayout</h1>
            <main>{children}</main>
        </>
    );
};
