export const metadata = {
    title: 'Asleep Вход',
    description: 'Вход на платформу Asleep',
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
