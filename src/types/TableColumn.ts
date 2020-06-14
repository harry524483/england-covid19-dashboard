type TableColumn = {
  title: string;
  dataIndex: string;
  render?: (text: string, record: any) => JSX.Element | string;
  align?: "left" | "right" | "center";
};

export default TableColumn;
