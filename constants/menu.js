import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

const home_header_menus = [
    {
        title: "Home",
        href: "/",
        sub_menu: []
    },
    {
        title: "About Us",
        href: "/",
        sub_menu: [
            {
                title: "History & Mission",
                href: "/abc",
            },
            {
                title: "Achievements",
                href: "/bcd",
            }
        ]
    },
    {
        title: "Products",
        href: "/",
        sub_menu: [
            {
                title: "RoStay Tea",
                href: "/",
            },
            {
                title: "Instant Milk Tea",
                href: "/",
            }
        ]
    },
    {
        title: "News",
        href: "/",
        sub_menu: [
            {
                title: "Promotional News",
                href: "/",
            },
            {
                title: "Brand Story",
                href: "/",
            },
            {
                title: "Events",
                href: "/",
            },
            {
                title: "RoStay Franchise",
                href: "/",
            },
        ]
    },
    {
        title: "Stores",
        href: "/",
        sub_menu: [
            {
                title: "Tocotoco Tea",
                href: "/",
            },
            {
                title: "Tocotoco Ice Cream & Coffee",
                href: "/",
            }
        ]
    },
    {
        title: "Careers",
        href: "/",
        sub_menu: []
    },
    {
        title: "Franchise",
        href: "/",
        sub_menu: []
    },
]

const home_footer_menus = [
    {
        title: "RoStay Joint Stock Company",
        sub_menu: [
            {
                title: "Headquarters: 5th Floor, Tower 1, Times City Urban Area, 458 Minh Khai, Vinh Tuy Ward, Hai Ba Trung District, Hanoi.",
                href: "",
                icon: MapPin
            },
            {
                title: "Southern Branch: 40B Nguyen Van Dau, Binh Thanh District, Ho Chi Minh City.",
                href: "",
                icon: MapPin
            },
            {
                title: "1900.63.69.36",
                href: "",
                icon: Phone
            },
            {
                title: "info@tocotocotea.com",
                href: "",
                icon: Mail
            },
            {
                title: "Business Registration No: 0106341306. Issued on: 16/03/2017.",
                href: "",
                icon: ""
            },
            {
                title: "Issued by: Department of Planning and Investment of Hanoi City.",
                href: "",
                icon: ""
            },
        ],
        social_medias: [
            {
                title: "Facebook",
                href: "#",
                icon: Facebook
            },
            {
                title: "Instagram",
                href: "#",
                icon: Instagram
            },
            {
                title: "YouTube",
                href: "#",
                icon: Youtube
            },
            {
                title: "Twitter",
                href: "#",
                icon: Twitter
            },
        ]
    },
    {
        title: "About Us",
        sub_menu: [
            {
                title: "Introduction to RoStay",
                href: "/",
            },
            {
                title: "Franchise",
                href: "/",
            },
            {
                title: "News & Promotions",
                href: "/",
            },
            {
                title: "General Regulations",
                href: "/",
            },
            {
                title: "Contact Info & Business License",
                href: "/",
            }
        ]
    },
    {
        title: "Policies",
        sub_menu: [
            {
                title: "Membership Policy",
                href: "/",
            },
            {
                title: "Payment Methods",
                href: "/",
            },
            {
                title: "Shipping & Delivery",
                href: "/",
            },
            {
                title: "Returns & Refunds",
                href: "/",
            },
            {
                title: "Personal Data Protection",
                href: "/",
            },
            {
                title: "Maintenance & Warranty",
                href: "/",
            }   
        ]
    }
]

export { home_header_menus, home_footer_menus };