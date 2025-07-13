import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import Logo from '@/app/assets/logosaas.png';
import Image from 'next/image';
// import { signIn } from '@/app/lib/auth';
import SubmitButton from './SubmitButton';
import { GitBranch, Goal } from 'lucide-react';

const AuthModel = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Get Started</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
                <DialogTitle className='hidden'>
                    d
                </DialogTitle>
                <DialogHeader className="flex flex-row gap-2 justify-center items-center">
                    <Image src={Logo} alt="Logo" className="size-8" />
                    <h4 className="text-2xl font-semibold">
                        Logo<span className="text-primary">Name</span>
                    </h4>
                </DialogHeader>
                <div className="flex flex-col mt-5 gap-3">
                    <form action={async () => {
                        "use server";
                        // await signIn("google");
                    }}>
                        <SubmitButton 
                            logo={<Goal />}  
                            text="Sign in with Google" 
                        />
                    </form>
                    <form action={async () => {
                        "use server";
                        // await signIn("github");
                    }}>
                        <SubmitButton 
                            logo={<GitBranch />}  
                            text="Sign in with Github" 
                        />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModel;
