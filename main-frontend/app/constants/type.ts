import { ReactNode } from "react";

export interface PricingProps {
    title: string;
    monthlyPrice: number;
    buttonText: string;
    popular: boolean;
    inverse: boolean;
    features: string[];
};

export interface TestimonialsProps {
    text: string;
    imageSrc: string;
    name: string;
    username: string;
}

export interface SubmitButtonProps {
    logo?:ReactNode | string;
    text: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    type?: "submit" | "button";
    className?: string
}

export interface ChildrenProps{
    children : React.ReactNode
}