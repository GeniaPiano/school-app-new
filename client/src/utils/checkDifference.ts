export const checkDifference = (initialFormData, name, selectTeacher, description, price, photoUrl) => {
    if (!initialFormData) {
        return "noDiff";
    }

    const isNameDifferent = name !== initialFormData.name;
    const isTeacherDifferent = selectTeacher !== initialFormData.teacher.id;
    const isDescriptionDifferent = description !== initialFormData.description;
    const isPriceDifferent = price !== initialFormData.price;
    const isPhotoUrlDifferent = photoUrl !== initialFormData.photoUrl;
    if (isNameDifferent || isTeacherDifferent || isDescriptionDifferent || isPriceDifferent || isPhotoUrlDifferent) {
        return "diff";
    }
    return "noDiff";
};