// function toButton(button) {
//   return `
//     <div class="button ${button.value ? "active" : ""}">
//         <i class="material-icons" data-type=${button.icon}>${button.icon}</i>
//       </div>
//       `;
// }

export function createToolbar(state) {
  const buttons = [
    {
      icon: "format_align_left",
      action: state["textAlign"] === "left",
      value: { textAlign: "left" },
    },
    {
      icon: "format_align_center",
      action: state["textAlign"] === "center",
      value: { textAlign: "center" },
    },
    {
      icon: "format_align_right",
      action: state["textAlign"] === "right",
      value: { textAlign: "right" },
    },
    {
      icon: "format_bold",
      action: state["fontWeight"] === "bold",
      value: { fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold" },
    },
    {
      icon: "format_italic",
      action: state["fontStyle"] === "italic",
      value: {
        fontStyle: state["fontStyle"] === "italic" ? "normal" : "italic",
      },
    },
    {
      icon: "format_underline",
      action: state["textDecoration"] === "underline",
      value: {
        textDecoration:
          state["textDecoration"] === "underline" ? "none" : "underline",
      },
    },
  ];

  return buttons
    .map((button) => {
      return `
    <div class="button ${button.action&&"active"}"
     data-type="button"
     data-value=${JSON.stringify(button.value)}
     >
        <i class="material-icons" 
        data-type="button"
        data-value=${JSON.stringify(button.value)}
        >
            ${button.icon}
        </i>
      </div>
      `;
    })
    .join("");
}
