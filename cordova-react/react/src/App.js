import React from 'react';
import AppBar from 'material-ui/AppBar';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';

class App extends React.Component {
	render() {
		return (
			<MuiThemeProvider >
			<AppBar
					title="Title"
 					iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
			</MuiThemeProvider>
		);
	}
}

export default App;
