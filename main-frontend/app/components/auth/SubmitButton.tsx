'use client';
import React from 'react';
import { SubmitButtonProps } from '@/app/constants/type';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SubmitButton: React.FC<SubmitButtonProps> = ({ logo, text, variant, type, className }) => {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled variant={variant || 'outline'} className="w-full">
                    <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
                </Button>
            ) : (
                <Button
                    className={cn('w-full', className)}
                    type={type || 'submit'}
                    variant={variant || 'outline'}
                >
                    {logo && <span className="size-4 mr-2">{logo}</span>} {/* Render JSX */}
                    {text}
                </Button>
            )}
        </>
    );
};

export default SubmitButton;
