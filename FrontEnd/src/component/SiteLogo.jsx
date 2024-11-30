// function Logo({width="100px"})
// {
//     return (<div className="w-3 h-3">{width}</div>)
// }

// export default Logo

function SiteLogo({width='100px'})
{
    return (
        <img src="https://res.cloudinary.com/shivcloudinary/image/upload/v1728883073/blog-site-favicon-color_xi8att.png" alt="Logo Image" className="w-[55px]" />
    )
}

export {SiteLogo}