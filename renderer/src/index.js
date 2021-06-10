


mainWindow.webContents.on('dom-ready', async () => {
  setTimeout(() => {
    mainWindow.webContents.executeJavaScript(
		await fetch()
	);
  }, 300);
});