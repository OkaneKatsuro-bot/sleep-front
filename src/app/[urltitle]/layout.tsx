export const metadata = {
    title: 'ПРОХОЖДЕНИЕ ТЕСТА ',
    description: 'ASLEEP',
}


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <main>{children}</main>
    )
}

