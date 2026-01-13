import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    className?: string;
}

export function StatsCard({ title, value, description, icon, trend, trendValue, className }: StatsCardProps) {
    return (
        <Card className={cn("overflow-hidden hover:shadow-md transition-shadow duration-200 border-border/50", className)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-heading">{value}</div>
                {(description || trendValue) && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        {trendValue && (
                            <span className={cn(
                                "font-medium",
                                trend === 'up' && "text-destructive",
                                trend === 'down' && "text-primary",
                                trend === 'neutral' && "text-muted-foreground"
                            )}>
                                {trendValue}
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
