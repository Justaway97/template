const headers = [
  { header: "select", type: "select", text: "select" },
  { header: "input", type: "input", text: "input" },
  { header: "autoComplete", type: "autoComplete", text: "auto_complete" },
  { header: "buttonToggle", type: "buttonToggle", text: "button_toggle" },
  {
    header: "multiAutoComplete",
    type: "multiAutoComplete",
    text: "multi_auto_complete",
  },
  { header: "datePicker", type: "datePicker", text: "date_picker" },
  { header: "position", type: "label", text: "position" },
  { header: "name", type: "label", text: "name" },
  { header: "weight", type: "label", text: "weight" },
  { header: "symbol", type: "label", text: "symbol" },
];

const tableDataSource = [
  {
    select: { value: true },
    input: { value: "testing 1" },
    auto_complete: {
      value: "One",
      optionRule: "AUTO_COMPLETE",
      disabled: false,
    },
    button_toggle: {
      value: "Two",
      optionRule: "BUTTON_TOGGLE",
    },
    multi_auto_complete: {
      value: ["Three", "Four"],
      optionRule: "AUTO_COMPLETE",
    },
    date_picker: {
      value: new Date().getTime(),
    },
    position: 1,
    name: "Hydrogen",
    weight: 1.0079,
    symbol: "H",
    menu: {
      icon: "more_vert",
      options: [
        {
          name: "abc",
          children: [{ name: "xyz", children: [{ name: "zzz" }] }],
        },
        { name: "bcd", children: [{ name: "xxx" }, { name: "yyy" }] },
        { name: "cde" },
      ],
    },
  },
];
