import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle, ArrowLeft, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const AccessDenied = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
            <Card className="max-w-md w-full shadow-lg border-destructive/20">
                <CardHeader className="pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                            <ShieldAlert size={48} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center text-destructive">Access Denied</h1>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        You don&apos;t have permission to access this admin area. This section is restricted to authorized personnel
                        only.
                    </p>
                    <div className="bg-muted p-4 rounded-lg flex items-start gap-3 text-sm">
                        <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="text-left">
                            <p className="font-medium mb-1">Need access?</p>
                            <p className="text-muted-foreground">
                                If you believe you should have access to this area, please contact your system administrator for
                                assistance.
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center pt-2 pb-6">
                    <Link href="/">
                        <Button size="lg" className="gap-2 cursor-pointer">
                            <ArrowLeft size={16} />
                            Return to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AccessDenied

