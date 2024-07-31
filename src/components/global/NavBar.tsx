export const NavBar = (props) => (
  <div className="flex justify-between items-center bg-white ">
    <div
      className="flex items-center h-11 hover:cursor-pointer"
      onClick={() =>
        chrome.tabs.create({
          url: "https://linkapp.one",
          active: true,
        })
      }
    >
      <img src={require("../../static/icon.png")} height={28} width={28} />
      <h2 className="text-main text-xl p-1 font-medium hover:text-slate-600">
        Firebase Extension
      </h2>
    </div>
    <img
      onClick={props.handleSideBar}
      height={28}
      width={28}
      className="rounded-full mr-3"
      src={props.image}
    />
  </div>
);
