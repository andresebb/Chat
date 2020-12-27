import scroll from "react-scroll";

export const scrollToBottom = (id) => {
  scroll.animateScroll.scrollToBottom({
    containerId: id,
    duration: 0,
  });
};

export const scrollToBottomAnimated = (id) => {
  scroll.animateScroll.scrollToBottom({
    containerId: id,
    duration: 0,
  });
};
