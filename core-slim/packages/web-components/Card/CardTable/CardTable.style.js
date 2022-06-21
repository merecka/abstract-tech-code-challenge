export default () => {
  return { container: { marginTop: 0, marginBottom: 0 }};
};

export const css = () => {
  const border = '0px solid transparent';
  return {
    table: {
      '&.ant-table-wrapper': {
        '&.abst-card-table': {

          '.ant-table': {
            border,
            margin: '0px -8px',

            th: {
              borderBottom: border
            }
          },
        }
      }
    }
  };
};
