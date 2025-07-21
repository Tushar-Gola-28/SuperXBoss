export const handleKeywordValue = (index, value, setKeywordsData) => {
    setKeywordsData((prev) => {
        return prev.map((it, ind) => {
            if (ind == index) {
                return value.trimStart()
            }
            return it
        })
    })
}

export const handleChangeValue = (e, setValues) => {
    const { name, value } = e.target
    setValues((prev) => {
        return {
            ...prev,
            [name]: value.trimStart()
        }
    })
}
export const handleAdd = (setKeywordsData) => {
    setKeywordsData((prev) => {
        return [...prev, ""]
    })
    window.scrollTo({
        top: document.body.scrollHeight + 100,
        behavior: "smooth",
    });
}

export const handleRemove = (ind, setKeywordsData) => {
    setKeywordsData((prev) => {
        return prev.filter((_, index) => index != ind)
    })
}

export const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (!((
        (charCode >= 48 && charCode <= 57) || // Numbers 0-9
        (charCode >= 96 && charCode <= 105) || // Numpad 0-9
        [8, 9, 37, 39, 46].includes(charCode)
    ) // Backspace, Tab, Left Arrow, Right Arrow, Delete
    )) {
        event.preventDefault();
    }
};