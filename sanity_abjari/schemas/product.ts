export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "pricegel",
      title: "Price in GEL",
      type: "number",
    },
    {
      name: "priceusd",
      title: "Price in USD",
      type: "number",
    },
    {
      name: "priceeur",
      title: "Price in EUR",
      type: "number",
    },
    {
      name: "details",
      title: "Size and Weight",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "size",
              title: "Size",
              type: "string",
            },
            {
              name: "weight",
              title: "Weight",
              type: "string",
            },
          ],
        },
      ],
    },

    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
