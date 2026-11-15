class BaseSchema {
  constructor(validator) {
    this._validator = validator;
    this._optional = false;
    this._nullable = false;
    this._defaultVal = undefined;
    this._hasDefault = false;
  }
  optional() {
    const clone = this._clone();
    clone._optional = true;
    return clone;
  }
  nullable() {
    const clone = this._clone();
    clone._nullable = true;
    return clone;
  }
  default(val) {
    const clone = this._clone();
    clone._optional = true;
    clone._hasDefault = true;
    clone._defaultVal = val;
    return clone;
  }
  or(other) {
    const self = this;
    const union = new BaseSchema((val) => {
      const r1 = self.safeParse(val);
      if (r1.success) return r1;
      return other.safeParse(val);
    });
    union._optional = self._optional || other._optional;
    union._nullable = self._nullable || other._nullable;
    return union;
  }
  _clone() {
    const c = new BaseSchema(this._validator);
    c._optional = this._optional;
    c._nullable = this._nullable;
    c._defaultVal = this._defaultVal;
    c._hasDefault = this._hasDefault;
    return c;
  }
  safeParse(val) {
    if (val === undefined) {
      if (this._hasDefault) return { success: true, data: this._defaultVal };
      if (this._optional) return { success: true, data: undefined };
      return { success: false, error: { errors: [{ message: "Required" }] } };
    }
    if (val === null) {
      if (this._nullable) return { success: true, data: null };
      return { success: false, error: { errors: [{ message: "Expected non-null" }] } };
    }
    return this._validator(val);
  }
  parse(val) {
    const res = this.safeParse(val);
    if (!res.success) {
      const err = new Error(res.error.errors[0]?.message || "Validation failed");
      err.errors = res.error.errors;
      throw err;
    }
    return res.data;
  }
}

class StringSchema extends BaseSchema {
  constructor(checks = []) {
    super((val) => {
      if (typeof val !== "string") return { success: false, error: { errors: [{ message: "Expected string" }] } };
      let v = val;
      for (const chk of checks) {
        if (chk.type === "trim") v = v.trim();
        else if (chk.type === "min" && v.length < chk.val) return { success: false, error: { errors: [{ message: chk.msg || "Too short" }] } };
        else if (chk.type === "max" && v.length > chk.val) return { success: false, error: { errors: [{ message: chk.msg || "Too long" }] } };
        else if (chk.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { success: false, error: { errors: [{ message: chk.msg || "Invalid email" }] } };
        else if (chk.type === "url" && !/^https?:\/\/.+/.test(v)) return { success: false, error: { errors: [{ message: chk.msg || "Invalid url" }] } };
        else if (chk.type === "regex" && !chk.re.test(v)) return { success: false, error: { errors: [{ message: chk.msg || "Invalid format" }] } };
      }
      return { success: true, data: v };
    });
    this._checks = checks;
  }
  _clone() {
    const c = new StringSchema([...this._checks]);
    c._optional = this._optional;
    c._nullable = this._nullable;
    c._defaultVal = this._defaultVal;
    c._hasDefault = this._hasDefault;
    return c;
  }
  trim() { const c = this._clone(); c._checks.push({ type: "trim" }); return c; }
  min(val, msg) { const c = this._clone(); c._checks.push({ type: "min", val, msg }); return c; }
  max(val, msg) { const c = this._clone(); c._checks.push({ type: "max", val, msg }); return c; }
  email(msg) { const c = this._clone(); c._checks.push({ type: "email", msg }); return c; }
  url(msg) { const c = this._clone(); c._checks.push({ type: "url", msg }); return c; }
  regex(re, msg) { const c = this._clone(); c._checks.push({ type: "regex", re, msg }); return c; }
}

class NumberSchema extends BaseSchema {
  constructor(checks = []) {
    super((val) => {
      if (typeof val !== "number" || isNaN(val)) return { success: false, error: { errors: [{ message: "Expected number" }] } };
      for (const chk of checks) {
        if (chk.type === "int" && !Number.isInteger(val)) return { success: false, error: { errors: [{ message: chk.msg || "Expected integer" }] } };
        if (chk.type === "min" && val < chk.val) return { success: false, error: { errors: [{ message: chk.msg || "Too small" }] } };
        if (chk.type === "max" && val > chk.val) return { success: false, error: { errors: [{ message: chk.msg || "Too large" }] } };
      }
      return { success: true, data: val };
    });
    this._checks = checks;
  }
  _clone() {
    const c = new NumberSchema([...this._checks]);
    c._optional = this._optional;
    c._nullable = this._nullable;
    c._defaultVal = this._defaultVal;
    c._hasDefault = this._hasDefault;
    return c;
  }
  int(msg) { const c = this._clone(); c._checks.push({ type: "int", msg }); return c; }
  min(val, msg) { const c = this._clone(); c._checks.push({ type: "min", val, msg }); return c; }
  max(val, msg) { const c = this._clone(); c._checks.push({ type: "max", val, msg }); return c; }
}

class ObjectSchema extends BaseSchema {
  constructor(shape, isStrict = false) {
    super((val) => {
      if (typeof val !== "object" || val === null || Array.isArray(val)) {
        return { success: false, error: { errors: [{ message: "Expected object" }] } };
      }
      if (isStrict) {
        for (const k of Object.keys(val)) {
          if (!(k in shape)) {
            return { success: false, error: { errors: [{ message: `Unrecognized key: ${k}` }] } };
          }
        }
      }
      const out = {};
      for (const [k, schema] of Object.entries(shape)) {
        const r = schema.safeParse(val[k]);
        if (!r.success) return r;
        if (r.data !== undefined) out[k] = r.data;
      }
      return { success: true, data: out };
    });
    this._shape = shape;
    this._isStrict = isStrict;
  }
  strict() {
    return new ObjectSchema(this._shape, true);
  }
}

export const z = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BaseSchema((v) => typeof v === "boolean" ? { success: true, data: v } : { success: false, error: { errors: [{ message: "Expected boolean" }] } }),
  literal: (lit) => new BaseSchema((v) => v === lit ? { success: true, data: v } : { success: false, error: { errors: [{ message: "Expected literal" }] } }),
  enum: (values, opts) => new BaseSchema((v) => values.includes(v) ? { success: true, data: v } : { success: false, error: { errors: [{ message: opts?.errorMap ? opts.errorMap().message : "Invalid enum value" }] } }),
  array: (itemSchema) => new BaseSchema((v) => {
    if (!Array.isArray(v)) return { success: false, error: { errors: [{ message: "Expected array" }] } };
    const out = [];
    for (const item of v) {
      const r = itemSchema.safeParse(item);
      if (!r.success) return r;
      out.push(r.data);
    }
    return { success: true, data: out };
  }),
  record: (keySchema, valSchema) => new BaseSchema((v) => {
    if (typeof v !== "object" || v === null || Array.isArray(v)) return { success: false, error: { errors: [{ message: "Expected record" }] } };
    for (const [k, val] of Object.entries(v)) {
      if (!keySchema.safeParse(k).success || !valSchema.safeParse(val).success) return { success: false, error: { errors: [{ message: "Invalid record entry" }] } };
    }
    return { success: true, data: v };
  }),
  object: (shape) => new ObjectSchema(shape, false),
};

export async function loadZod() {
  try {
    const mod = await import("zod");
    return mod.z;
  } catch {
    return z;
  }
}
