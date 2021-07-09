import { mount, ReactWrapper } from "enzyme";
import LoadingTags from "../index";

describe("LoadingTags", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<LoadingTags />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("renders the specificed placeholder height and width", () => {
    wrapper.setProps({ height: 398, width: 780, opacity: "1", duration: "1s" });

    const StyledNode = wrapper.find("[data-testid='loading-tag-card']");

    expect(StyledNode).toHaveStyleRule("height", "398px");
    expect(StyledNode).toHaveStyleRule("width", "780px");
    expect(StyledNode).toHaveStyleRule(
      "animation",
      "pulse 1s infinite ease-in-out"
    );

    expect(StyledNode).toHaveStyleRule("height", "796px", { target: "before" });
    expect(StyledNode).toHaveStyleRule("width", "97.5px", { target: "before" });
    expect(StyledNode).toHaveStyleRule(
      "animation",
      "wave 1s infinite ease-in-out",
      { target: "before" }
    );
  });
});
