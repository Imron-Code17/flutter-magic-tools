document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');
    const indicator = document.querySelector('.indicator');

    // Get the VS Code API
    const vscode = window.acquireVsCodeApi();

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked tab and its content
            const targetContentId = `content-${this.id.replace('tab-', '')}`;
            const targetContent = document.getElementById(targetContentId);

            this.classList.add('active');
            targetContent.classList.add('active');

            // Update indicator position
            const tabRect = this.getBoundingClientRect();
            const tabsRect = document.querySelector('.tabs').getBoundingClientRect();
            indicator.style.width = `${tabRect.width}px`;
            indicator.style.left = `${tabRect.left - tabsRect.left}px`;

            // Load content for the selected tab
            loadContent(targetContentId, this.id.replace('tab-', ''));
        });
    });

    // Select the first tab by default
    if (tabs.length > 0) {
        tabs[0].click();
    }

    function loadContent(contentId, tabName) {
        const content = document.getElementById(contentId);

        if (!content) return;

        const htmlMap = {
            'model': 'model_view.html',
            'view': 'view_page_view.html',
            'endpoint': 'endpoint_view.html',
            'cubit': 'cubit_view.html',
            'request': 'request_view.html'
        };
        const htmlPath = htmlMap[tabName];

        // Send a message to the VS Code extension to load the HTML content
        vscode.postMessage({ command: 'loadContent', filePath: htmlPath });
    }

    // Listen for messages from the extension
    window.addEventListener('message', event => {
        const message = event.data;

        switch (message.command) {
            case 'displayContent':
                const activeContent = document.querySelector('.content.active');
                if (activeContent) {
                    activeContent.innerHTML = message.content;
                }
                break;
        }
    });
});
