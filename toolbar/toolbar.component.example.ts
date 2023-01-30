const sample = {
  left: [
    {
      display: "icon",
      type: "button",
      text: "menu",
      role: ["ALL"],
      options: [
        {
          name: "abc",
          children: [{ name: "xyz", children: [{ name: "zzz" }] }],
        },
        { name: "bcd", children: [{ name: "xxx" }, { name: "yyy" }] },
        { name: "cde" },
      ],
    },
    {
      display: "text",
      type: "text",
      text: "test toolbar",
    },
  ],
  right: [
    {
      display: "icon",
      type: "button",
      text: "share",
      options: [
        {
          name: "abc",
          children: [{ name: "xyz", children: [{ name: "zzz" }] }],
        },
        { name: "bcd", children: [{ name: "xxx" }, { name: "yyy" }] },
        { name: "cde" },
      ],
    },
    {
      display: "icon",
      type: "button",
      text: "favorite",
    },
    {
      display: "icon",
      type: "button",
      text: "delete",
    },
  ],
};
