// click the upvoters panel
document.querySelector(".voters_5df25").click();

// run the start function (below). But first, give the popup a second to load.

setTimeout(start, 3000);

function start() {
  //setInterval() is used to repeatedly execute a scroll function every 2 secs until clearInterval is called.
  intervalId = setInterval(scroll, 2000);
}

function scroll() {
  let upvotersDiv = document.querySelector(".popoverContent_b0e8d");
  const childCount = upvotersDiv.childElementCount;
  console.log("loaded", childCount);

  // if we've scrolled to the end, click upvote button and scrape

  if (childCount === prevChildCount) {
    clearInterval(intervalId);
    console.log("all upvoters loaded");
    document.querySelector(".voteButtonAside_1094f button").click();
    setTimeout(scrape, 3000);

    return;
  } else {
    //If we haven't reached the bottom, keep scrolling.
    prevChildCount = childCount;
    upvotersDiv.scroll(0, 1e10);
    console.log("delay...", 2);
  }
}

function scrape() {
  // get all users and extract the tag, name and profile url
  const upvoters = Array.from(
    document.querySelector(".users_09e39").children
  ).map(li => ({
    tag: li.firstElementChild.getAttribute("href").slice(2),
    name: li.firstElementChild.firstElementChild.firstElementChild.alt,
    profile: li.firstElementChild.href
  }));

  // create a JSON file with the scraped info and download it

  const a = document.createElement("a");
  a.download = `users.json`;
  a.href = URL.createObjectURL(new Blob([JSON.stringify(upvoters, null, 2)]));
  a.click();
  URL.revokeObjectURL(a.href);
  document.querySelector(".close_5f89e").click();
}