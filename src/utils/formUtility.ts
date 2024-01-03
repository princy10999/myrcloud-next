export class FormUtility {
  public static convertModelToFormData(
    model: any,
    form?: FormData | null,
    namespace = ""
  ): FormData {
    let formData = form || new FormData();
    let formKey;

    for (let propertyName in model) {
      if (
        !model.hasOwnProperty(propertyName) ||
        (!model[propertyName] &&
          model[propertyName] !== 0 &&
          model[propertyName] !== "")
      )
        continue;
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
      if (model[propertyName] instanceof Date)
        formData.append(formKey, model[propertyName].toISOString());
      else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element: any, index: number) => {
          const tempFormKey = `${formKey}[${index}]`;
          this.convertModelToFormData(element, formData, tempFormKey);
        });
      } else if (
        typeof model[propertyName] === "object" &&
        !(model[propertyName] instanceof File) &&
        !(model[propertyName] instanceof Blob)
      )
        this.convertModelToFormData(model[propertyName], formData, formKey);
      else formData.append(formKey, model[propertyName].toString());
      console.log(formKey);
    }
    return formData;
  }
}

export function buildFormData(
  data: any,
  form?: FormData | null,
  parentKey = ""
) {
  let formData = form || new FormData();
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}
