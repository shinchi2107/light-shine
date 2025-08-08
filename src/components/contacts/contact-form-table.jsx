import Image from "next/image";
import ContainerWrapper from "../common/container-wrapper";
import InputField from "../form/input-field";
import TextareaField from "../form/textarea-field";
import ArrowRightIcon from "../icon/ArrowRightIcon";

const ContactFormTable = () => {
    return (
        <div className="contact-form-table__wrapper relative w-full h-[800px] mb-[200px]">
            <div className="contact-form-table__background absolute top-0 left-0 w-full h-full z-0">
                <Image className="w-full h-full object-cover" src="/banner/banner-contact-form-table.webp" alt="contact-form-table-background" width={1920} height={1080} />
                <div className="contact-form-table__background__overlay absolute top-0 left-0 w-full h-full z-10 bg-black/60"></div>
            </div>
            <div className="contact-form-table__content absolute top-0 left-0 w-full h-full z-10 mt-[100px]">
                <ContainerWrapper className="2xl:px-[100px]">
                    <div className="contact-form-table__content__subtitle text-white text-center">
                        <h2 className="text-[13px] uppercase font-[600] tracking-[2px] text-[var(--color-primary)]">Your table</h2>
                    </div>
                    <div className="contact-form-table__content__title text-white text-center mb-10">
                        <h2 className="text-[60px] font-[shippori_mincho] uppercase tracking-[3px]">Book a table</h2>
                    </div>
                    <div className="contact-form-table__content__form w-2/3 xl:w-1/2 mx-auto border border-[#f2b61275] rounded-b-full p-[50px_55px_124px] bg-[#3c39375c] backdrop-blur-[32px]">
                        <div className="contact-form-table__content__form__title text-white text-center">
                            <h2 className="text-[20px] font-[600] text-white uppercase mb-7">Book a table</h2>
                        </div>
                        <form className="contact-form-table__content__form__fields">
                            <div className="field-group flex gap-x-5 justify-center mb-5">
                                <InputField
                                    className="border-b-1 border-[var(--color-accent-3)] text-[var(--color-accent-3)] placeholder:text-[var(--color-accent-3)] placeholder:text-[14px] py-[15px]"
                                    placeholder="Name"
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                />
                                <InputField
                                    className="border-b-1 border-[var(--color-accent-3)] text-[var(--color-accent-3)] placeholder:text-[var(--color-accent-3)] placeholder:text-[14px] py-[15px]"
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                />
                            </div>
                            <div className="field-group flex gap-x-5 justify-center mb-5">
                                <InputField
                                    className="border-b-1 border-[var(--color-accent-3)] text-[var(--color-accent-3)] placeholder:text-[var(--color-accent-3)] placeholder:text-[14px] py-[15px]"
                                    placeholder="Phone number"
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    autoComplete="tel"
                                />
                            </div>
                            <div className="field-group flex gap-x-5 justify-center mb-10">
                                <TextareaField
                                    rows={6}
                                    className="border-b-1 border-[var(--color-accent-3)] text-[var(--color-accent-3)] placeholder:text-[var(--color-accent-3)] placeholder:text-[14px] py-[15px]"
                                    placeholder="Let us know what you need."
                                    name="message"
                                    id="message"
                                    autoComplete="message"
                                    
                                />
                            </div>
                            <div className="btn-contact field-group flex justify-center">
                                <button className="group font-[600] bg-[var(--color-primary)] hover:bg-[#ffc525] transition-all duration-300 text-[12px] uppercase tracking-[2px] text-black px-8 py-5 rounded-full flex items-center gap-x-2 cursor-pointer">
                                    Book a table
                                    <div className="group-hover:translate-x-1 transition-all duration-300">
                                        <ArrowRightIcon width={16} height={16} fill="black"/>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </ContainerWrapper>
            </div>
        </div>
    )
}

export default ContactFormTable;