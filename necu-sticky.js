const sidebar = document.getElementById('sticky-right-blog');
const container = document.getElementById('sticky-container');

necuStickySidebar(sidebar, container);

function necuStickySidebar(sidebar, container = window) {
    const screenHeight = parseInt(window.innerHeight.toFixed());

    let lastScroll = 0;

    let containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage;

    window.necuCheckNormalize = 0;

    window.addEventListener('scroll', function () {
        containerHeight = container.offsetHeight;
        containerHeight = parseInt(containerHeight.toFixed());

        sidebarHeight = sidebar.offsetHeight;
        sidebarHeight = parseInt(sidebarHeight.toFixed());

        initialSidebarPosition = container.offsetTop;
        initialSidebarPosition = parseInt(initialSidebarPosition.toFixed());

        var bodyRect = document.body.getBoundingClientRect(),
            sidebarReact = sidebar.getBoundingClientRect(),

            currentSidebarPositionRelativeToPage = sidebarReact.top - bodyRect.top;
        currentSidebarPositionRelativeToPage = parseInt(currentSidebarPositionRelativeToPage.toFixed());

        currentSidebarPositionRelativeToContainer = currentSidebarPositionRelativeToPage - initialSidebarPosition;
        currentSidebarPositionRelativeToContainer = parseInt(currentSidebarPositionRelativeToContainer.toFixed());

        scrollUp = window.scrollY;
        scrollUp = scrollUp.toFixed();
        scrollUp = parseInt(scrollUp);

        scrollDown = scrollUp + screenHeight;

        if (scrollUp > lastScroll) {
            necuScrollDown(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight);
        } else {
            necuScrollUp(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight);
        }

        lastScroll = scrollUp;
    })
}

function necuScrollDown(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight) {
    if (currentSidebarPositionRelativeToContainer + sidebarHeight >= containerHeight) necuStopIt (sidebar, 'down');
    else {
        if (scrollDown >= currentSidebarPositionRelativeToPage + sidebarHeight) {
            necuFixedBottom(sidebar,currentSidebarPositionRelativeToPage);
        } else if (necuCheckNormalize) {
            necuNormalize(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight);
        }
    }
}

function necuScrollUp(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight) {
    if (currentSidebarPositionRelativeToPage <= initialSidebarPosition) necuStopIt (sidebar, 'up');
    else {
        if (scrollUp <= currentSidebarPositionRelativeToPage) {
            necuFixedTop (sidebar);
        } else if (necuCheckNormalize) {
            necuNormalize(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight);
        }
    }
}

function necuFixedBottom (sidebar) {
    necuCheckNormalize = 1;
    sidebar.setAttribute('style','width: ' + sidebar.offsetWidth + 'px; position: fixed; bottom:0' );
}

function necuFixedTop (sidebar) {
    necuCheckNormalize = 1;
    sidebar.setAttribute('style','width: ' + sidebar.offsetWidth + 'px; position: fixed; top:0' );
}

function necuNormalize (sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight) {
    necuCheckNormalize = 0;
    console.log(currentSidebarPositionRelativeToContainer);
    sidebar.setAttribute('style', ' position: absolute; top: ' + currentSidebarPositionRelativeToContainer + 'px;' );
}

function necuStopIt (sidebar, direction) {
    necuCheckNormalize = 0;
    if (direction === 'up') necuStopItTop(sidebar);
    else if (direction === 'down') necuStopItBottom(sidebar);
}

function necuStopItTop(sidebar) {
    sidebar.setAttribute('style', 'position: absolute; top: 0');
}

function necuStopItBottom(sidebar) {
    sidebar.setAttribute('style', 'position: absolute; bottom: 0')
}
