"use client"
import {Button} from "@/components/ui/button"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Calendar,
    UserRound,
    LayoutDashboard,
    LogOut,
    Search,
    SquareCheckBig,
    SquarePen,
    UsersRound
} from "lucide-react";
import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";


export default function Sidebar() {
    const router = useRouter()
    const pathname = usePathname();

    const isActive = (key: string) => pathname.startsWith(`/admin/${key}`);


    return (
        <nav className=" absolute left-0 top-0 h-screen flex flex-col justify-between items-center gap-1 p-2 pr-6 ">
            <TooltipProvider>
                <div className="rounded-2xl backdrop-blur bg-gray-200 w-12 h-12 justify-center flex items-center">
                    <img
                        src="/sleeplogo.png"
                    />
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => router.push('/admin')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                            aria-label="Личный кабинет"
                        >
                            <UserRound className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Личный кабинет
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => router.push('/admin/users')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('users') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}

                            aria-label="Пользователи"
                        >
                            <UsersRound className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Пользователи
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => router.push('/admin/posts')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('posts') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}

                            aria-label="База знаний"
                        >
                            <SquarePen className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        База знаний
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => router.push('/admin/tests')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('tests') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                            aria-label="Тесты"
                        >
                            <SquareCheckBig className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Тесты
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => router.push('/admin/calendars')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('calendars') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                            aria-label="Календарь"
                        >
                            <Calendar className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Календарь
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => router.push('/admin/shop')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('shop')}`}
                            aria-label="Конструктор"
                        >
                            <LayoutDashboard className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Конструктор
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => router.push('/admin/methods')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('methods')}`}
                            aria-label="Методы диагностики"
                        >
                            <Search className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Методы диагностики
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-lg"
                            aria-label="Settings"
                        >
                            <LogOut className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-destructive" side="right" sideOffset={5}>
                        Выйти из аккаунта
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </nav>
    );
}
