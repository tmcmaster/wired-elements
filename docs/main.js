window.onload = () => {

    const testing = undefined;
    //const testing = 'slider';

    const examples = [
        'card', 'checkbox', 'combo', 'drawer', 'fab', 'icon-button',
        'input', 'listbox', 'progress', 'radio', 'slider', 'spinner',
        'tabs', 'textarea', 'title', 'toggle'
    ];

    setTimeout(function () {

        const tabs = document.createElement('wired-tabs');

        examples.forEach((example) => {
            if (!testing || testing === example) {
                const tab = document.createElement('wired-tab');
                tab.setAttribute('name', example);
                const iframe = document.createElement('iframe');
                iframe.width = '100%';
                setTimeout(() => {
                    iframe.src = `pages/${example}.html`;
                }, 1000);
                tab.appendChild(iframe);
                tabs.appendChild(tab);
            }
        });

        if (!testing) {
            tabs.setAttribute('selected', examples[0]);
        } else {
            tabs.setAttribute('selected', testing);
        }

        tabs.setAttribute('id', 'tabs');

        document.body.appendChild(tabs);
    }, 10);
};

document.body.onkeypress = (event) => loadInNewTab(event);

// CTRL-T to open current tab in a new browser tab.
// monitorEvents($0) to monitor key strokes
function loadInNewTab(e) {
    if (e.charCode === 20 && e.ctrlKey) {
        const tabs = document.getElementById('tabs');
        const selected = tabs.selected;
        const url = `pages/${selected}.html`;
        console.log('URL: ', url);
        window.open(url, '_blank');
    }
}

