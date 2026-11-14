function SectionTitle({children, className = ""}){
    const titleClassName = ["section-title", className,].filter(Boolean).join(" ");

    return(
        <h2 className={titleClassName}>{children}</h2>
    );
}

export default SectionTitle;