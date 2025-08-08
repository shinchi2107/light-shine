"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import Image from "next/image";

const HeaderOrder = () => {
    return (
        <div className="bg-white flex items-center justify-between p-2">
            <div className="header-logo max-w-[150px] max-h-[150px]">
                <Image className="w-full h-full object-cover" src="/logo/logo-header.png" alt="logo" width={300} height={300} />
            </div>
            <div className="header-search__wrapper flex items-center gap-2">
                <Input className="w-[500px] rounded-full transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#d8b979] focus-visible:ring-[#d8b979]" type="text" placeholder="Tìm kiếm sản phẩm..." />
                <Select onValueChange={(value) => console.log(value)}>
                    <SelectTrigger className="rounded-full cursor-pointer">
                        <SelectValue placeholder="Tất cả" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tat-ca">Tất cả</SelectItem>
                        <SelectItem value="mien-bac">Miền bắc</SelectItem>
                        <SelectItem value="mien-nam">Miền nam</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="header-auth__wrapper">
                <Button className="login-button cursor-pointer text-white bg-[#d8b979] rounded-full">Đăng nhập</Button>
            </div>
        </div>
    )
}

export default HeaderOrder;