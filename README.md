# Komputer Store
![build](https://img.shields.io/badge/build-passing-green)

## Abstract
> Make an application for a laptop store, with bank, loan and payment, using JavaScript.

> Part of the Noroff fullstack .NET accelerate module.

## Download and run 
```bash==
git clone https://github.com/lasse-steinnes/Noroff_Komputer_Store.git
```

You can run the app with the Live Server extension in the IDE Visual Studio Code.

## Functionality
The Komputer Store page gives the following GUI options:
1. Bank: Your bank account gives you an overview of your balance, and allows you to take up a loan.
2. Work: Your work allows you to get paid and choose what to do with that money. Among the options is to pay back on the loan, or save money in your bank account. The latter option will make sure that 10% of your pay will go to repay any existing loans. 
3. Select: Choose a laptop matching your preferred laptop-features.
4. Buy: If you can afford it, buy your preferred laptop.

## Dependencies
[![js](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/ht)
[![css](https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor=000)](https://en.wikipedia.org/wiki/CSS)
[![html](https://img.shields.io/badge/-HTML-E34F26?logo=html5&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![vscode](https://img.shields.io/badge/-Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=000)](https://code.visualstudio.com/)
[![windows](https://img.shields.io/badge/-Windows-0078D6?logo=windows&logoColor=000)](https://www.microsoft.com/sv-se/windows)

## Code: Link and description
- [styling.css](https://github.com/lasse-steinnes/Noroff_Komputer_Store/blob/main/styling.css) : Cascading Style Sheets. Specifies style classes. 
- [app.js](https://github.com/lasse-steinnes/Noroff_Komputer_Store/blob/main/styling.css) : Application JavaScript. Handles the eventspecific actions.  
- [index.html](https://github.com/lasse-steinnes/Noroff_Komputer_Store/blob/main/index.html) : HTML script with interface to app.js. Orders inline and block-elements.

## Feedback:

> ... that's very mindful.

> Nice readme.md file, just remember to add your name and any others who contributed to the development of the project. This will not affect your grade for now.

> For variable names we try avoid names like "box2", "box3", etc. because they are not very descriptive, and it's confusing for someone who is reading your code.

> Generally we will never put multiple function calls on one line like you have in app.js line 118 & 121. If we update that line of code, our git repository will highlight that line as changed, and it won't be immediately visible what has changed.

> You hardcoded a fix to the laptop image that doesn't load correctly (this is done on purpose to make sure you handle broken images correctly). Always use "alt-text" with your <img> tags to give extra information to the user when needed.

> When your page loads, the Work Balance and Bank Balance numbers are formatted as "0 NOK", and when they are updated, they change to "100,00 kr". Keep an eye out for consistency.

> Really good functionality to prompt the user if they want the surplus of their Work Balance after repaying a loan to be transferred to the Bank Balance. When receiving the response to that prompt, make sure that it's case-insensitive, so the user can type "Y", "y", "N", or "n".

> The user should not be able to enter a negative loan amount, e.g. "-100". The user should not be able to enter a non-number loan amount, e.g. "abc".

> Overall a really good submission, well done!
