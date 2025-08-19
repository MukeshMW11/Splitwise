export const createExpenseConfig = [
  {
    name: "title",
    label: "Expense Title",
    type: "text",
    placeholder: "Enter expense title",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter expense description",
    required: true,
  },
  {
    name: "amount",
    label: "Total Amount",
    type: "number",
    placeholder: "0.00",
    required: true,
    step: "0.01",
  },
  {
    name: "split_type",
    label: "Split Type",
    type: "select",
    required: true,
    options: [
      { value: "equally", label: "Split Equally" },
      { value: "unequally", label: "Split Unequally" },
      { value: "percentage", label: "Split by Percentage" },
    ],
  },
  {
    name: "participants",
    label: "Participants",
    type: "multiselect",
    placeholder: "Select participants",
    required: true,
  },
  {
    name: "payers_data",
    label: "Who Paid?",
    type: "payers",
    required: true,
  },
];
