export const metadata = {
    title: 'Asleep Регистрация',
    description: 'Регистрация на платформе Asleep',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div>{children}</div>

    )
}
