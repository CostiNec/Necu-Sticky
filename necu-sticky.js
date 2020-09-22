function necuStickySidebar(sidebar, container = window, options = {}) {
    const screenHeight = parseInt(window.innerHeight.toFixed());

    let lastScroll = 0;

    let containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage;

    window.necuCheckNormalize = 0;

    if (options.direction !== undefined) {
        if (options.direction === 'top') {
            let top = 0;

            if (options.distanceTop !== undefined) {
                top += options.distanceTop;
            }

            container.setAttribute('style','position: relative')
            sidebar.setAttribute('style','position: sticky; top: ' + top + 'px')
        } else if (options.direction === 'bottom') {
            window.addEventListener('scroll', function () {
                containerHeight = container.offsetHeight;
                containerHeight = parseInt(containerHeight.toFixed());

                sidebarHeight = sidebar.offsetHeight;
                sidebarHeight = parseInt(sidebarHeight.toFixed());

                if (containerHeight > sidebarHeight && sidebarHeight > screenHeight) {
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
                        necuScrollDownBottom(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight, options);
                    } else {
                        necuScrollUpBottom(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight, options);
                    }

                    lastScroll = scrollUp;
                }
            })
        }

    } else {
        window.addEventListener('scroll', function () {
            containerHeight = container.offsetHeight;
            containerHeight = parseInt(containerHeight.toFixed());

            sidebarHeight = sidebar.offsetHeight;
            sidebarHeight = parseInt(sidebarHeight.toFixed());

            if (containerHeight > sidebarHeight && sidebarHeight > screenHeight) {
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
                    necuScrollDown(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight, options);
                } else {
                    necuScrollUp(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight, options);
                }

                lastScroll = scrollUp;
            }
        })
    }
}

function necuScrollDown(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight, options) {
    if (currentSidebarPositionRelativeToContainer + sidebarHeight >= containerHeight) necuStopIt (sidebar, 'down');
    else {
        let checkDown = currentSidebarPositionRelativeToPage + sidebarHeight;

        if (options.distanceBottom !== undefined) {
            checkDown += options.distanceBottom;
        }

        if (scrollDown >= checkDown) {
            necuFixedBottom(sidebar, options);
        } else if (necuCheckNormalize) {
            necuNormalize(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight);
        }
    }
}

function necuScrollDownBottom(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight, options) {
    if (currentSidebarPositionRelativeToContainer + sidebarHeight >= containerHeight) necuStopIt (sidebar, 'down');
    else {
        let checkDown = currentSidebarPositionRelativeToPage + sidebarHeight;

        if (options.distanceBottom !== undefined) {
            checkDown += options.distanceBottom;
        }

        if (scrollDown >= checkDown) {
            necuFixedBottom(sidebar, options);
        }
    }
}

function necuScrollUp(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight, options) {
    if (currentSidebarPositionRelativeToPage <= initialSidebarPosition) necuStopIt (sidebar, 'up');
    else {
        let checkTop = currentSidebarPositionRelativeToPage;

        if (options.distanceTop !== undefined) {
            checkTop -= options.distanceTop;
        }
        if (scrollUp <= checkTop) {
            necuFixedTop (sidebar, options);
        } else if (necuCheckNormalize) {
            necuNormalize(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight);
        }
    }
}

function necuScrollUpBottom(sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight, options) {
    if (currentSidebarPositionRelativeToPage <= initialSidebarPosition) necuStopIt (sidebar, 'up');
    else {
        let checkDown = currentSidebarPositionRelativeToPage + sidebarHeight;
        let positionEndContainer = initialSidebarPosition + containerHeight;

        if (options.distanceBottom !== undefined) {
            checkDown += options.distanceBottom;
            positionEndContainer += options.distanceBottom;
        }

        if ( scrollDown < positionEndContainer ) {
            if (scrollDown < checkDown ) {
                necuFixedBottom(sidebar, options);
            }
        } else if (checkDown > positionEndContainer ) {
            necuFixedBottom(sidebar, options);
        }
    }
}

function necuFixedBottom (sidebar, options) {
    necuCheckNormalize = 1;
    let bottom = 0;

    if (options.distanceBottom !== undefined) {
        bottom += options.distanceBottom;
    }

    sidebar.setAttribute('style','width: ' + sidebar.offsetWidth + 'px; position: fixed; bottom:' + bottom + 'px' );
}

function necuFixedTop (sidebar, options) {
    necuCheckNormalize = 1;
    let top = 0;
    if (options.distanceTop !== undefined) {
        top += options.distanceTop;
    }


    sidebar.setAttribute('style','width: ' + sidebar.offsetWidth + 'px; position: fixed; top:' + top + 'px' );
}

function necuNormalize (sidebar, container, containerHeight, sidebarHeight, scrollUp, scrollDown, initialSidebarPosition, currentSidebarPositionRelativeToContainer, currentSidebarPositionRelativeToPage,screenHeight) {
    necuCheckNormalize = 0;
    sidebar.setAttribute('style', 'width: ' + sidebar.offsetWidth + 'px; position: absolute; top: ' + currentSidebarPositionRelativeToContainer + 'px;' );
}

function necuStopIt (sidebar, direction) {
    necuCheckNormalize = 0;
    if (direction === 'up') necuStopItTop(sidebar);
    else if (direction === 'down') necuStopItBottom(sidebar);
}

function necuStopItTop(sidebar) {
    sidebar.setAttribute('style', 'width: ' + sidebar.offsetWidth + 'px; position: absolute; top: 0');
}

function necuStopItBottom(sidebar) {
    sidebar.setAttribute('style', 'width: ' + sidebar.offsetWidth + 'px; position: absolute; bottom: 0')
}

window.necuStickySidebar = necuStickySidebar;
