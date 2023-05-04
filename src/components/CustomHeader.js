const CustomHeader = ({containerClass, title, subtitle, titleClass, subTitleClass, blueWord}) =>{
return(
<div className={containerClass}>
    <h2 className={titleClass}>{title} {blueWord && <span style={{color: "blue"}}>{blueWord}</span>}</h2>

    <p className={subTitleClass}>{subtitle}</p>

</div>
)
}

export default CustomHeader