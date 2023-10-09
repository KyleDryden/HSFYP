// Import necessary modules and components
import HelpScout, { NOTIFICATION_TYPES } from "@helpscout/javascript-sdk";
import {
    Button,
    DefaultStyle,
    Heading,
    useSetAppHeight,
    Text,
    useHelpScoutContext,
} from "@helpscout/ui-kit";
import { useEffect, useState } from "react";

function App() {
    // Fetch Help Scout context and log it when the component is mounted
    HelpScout.getApplicationContext().then((context) => {
        console.log('Help Scout Context:', context);
    });

    // Set the application height dynamically based on content
    const appRef = useSetAppHeight();

    // Initialize state variables for status and visibility of a notification
    const [status, setStatus] = useState("unknown status");
    const [show, setShow] = useState(false);

    // Access user and conversation information from Help Scout context
    const { user } = useHelpScoutContext();
    const { conversation } = useHelpScoutContext();

    // Function to handle the "Import Data" button click event
    function onClick() {
        // Show a success notification when the button is clicked
        HelpScout.showNotification(
            NOTIFICATION_TYPES.SUCCESS,
            "Import complete"
        );
        // Set the "show" state to true to display additional content
        setShow(true);
    }

    // Render the HTML content
    return (
        <html className="App">
            <div>
                {/* Apply default Help Scout styles */}
                <DefaultStyle />
                <br />
                {/* Render a button that triggers the onClick function */}
                <Button size="sm" onClick={onClick}>
                    Import Data
                </Button>
                {/* Display additional content when "show" state is true */}
                {show && (
                    <div>
                        {/* Display a heading with the user's first name and conversation ID */}
                        <Heading level="h1">Hello, User.</Heading>
                        <div>First Name: {user?.firstName}</div>
                        <div>Last Name: {user?.lastName}.</div>
                        <div>This conversation has the unique ID of {conversation?.id}.</div>
                        {/* Display the status text */}
                        <div></div>
                    </div>
                )}
            </div>
        </html>
    );
}

export default App;