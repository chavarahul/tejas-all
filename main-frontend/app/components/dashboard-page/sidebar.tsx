// import Image from 'next/image'
// import React from 'react'
// import Logo from '@/app/assets/logosaas.png';
// import Link from 'next/link';
// import { LogOut, User2 } from 'lucide-react';

// const Sidebar = async () => {
//     return (
//         <header className="py-10 flex items-center justify-center">
//             <div className="w-1/2 py-1.5 px-3 flex justify-between backdrop-blur-lg bg-white/30 rounded-[5px]">
//                 <div className="flex gap-4 items-center">
//                     <Image src={Logo} alt='logo' width={30} height={20} />
//                     <p className="">LogoName</p>
//                 </div>
//                 <nav className='hidden md:flex gap-6 text-black/70 items-center'>
//                     <Link href="/dashboard">Models</Link>
//                     <Link href="/dashboard/premium-models">Premium models</Link>
//                     <Link href="/pricing">Pricing</Link>
//                     <Link href="/support">Support</Link>
//                 </nav>
//                 <div className="">
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild className='cursor-pointer'>
//                             <div className='rounded-full size-[2.2rem] flex items-center justify-center'>
//                                 <img src={session?.user?.image as string} alt='profile-image' width={15} height={15} className='w-full h-full rounded-full' />
//                             </div>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align='end' className='bg-[#EAEEFE] mt-2 rounded-[5px] hover:bg-none'>
//                             <DropdownMenuLabel className='text-black/70'>My Account</DropdownMenuLabel>
//                             <DropdownMenuSeparator className='bg-black/60' />
//                             <DropdownMenuItem className='cursor-pointer hover:bg-transparent' asChild>
//                                 <Link href={"/dashboard/profile"}>
//                                     <User2 />
//                                     <span className='text-black/70'>Profile</span>
//                                 </Link>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem asChild className='hover:bg-none'>
//                                 <div>
//                                     <LogOut />
//                                     <form action={async () => {
//                                         "use server";
//                                         await signOut();
//                                     }} className='w-full'>
//                                         <button className='w-full text-left text-black/70'>Log out</button>
//                                     </form>
//                                 </div>
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Sidebar