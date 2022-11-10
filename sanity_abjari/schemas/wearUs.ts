export default {
    name: 'wearus',
    title: 'They Wear Us',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'desc',
            title: 'Description',
            type: 'text',
            rows: 3,
        },
        {
            name: 'socialLink',
            title: 'Link to Social Media',
            type: 'string',
        },
        // {
        //     name: 'smallText',
        //     title: 'SmallText',
        //     type: 'string',
        // },
        // {
        //     name: 'midText',
        //     title: 'MidText',
        //     type: 'string',
        // },
        // {
        //     name: 'largeText1',
        //     title: 'LargeText1',
        //     type: 'string',
        // },
        // {
        //     name: 'largeText2',
        //     title: 'LargeText2',
        //     type: 'string',
        // },
        // {
        //     name: 'discount',
        //     title: 'Discount',
        //     type: 'string',
        // },
        // {
        //     name: 'saleTime',
        //     title: 'SaleTime',
        //     type: 'string',
        // },
    ],
}
