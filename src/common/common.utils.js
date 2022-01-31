export function protectResolver(resolver, options = { auth: false }) {
  return async (root, args, context, info) => {
    if (options.auth && !context.authorizedUser) return { ok: false, error: 'No User Authorized' };
    try {
      return await resolver(root, args, context, info);
    } catch ({ code, message, meta }) {
      // console.error(message, code);
      switch (code) {
        case 'P2002':
          switch (meta.target[0]) {
            case 'email':
              return { ok: false, error: 'The Email Already Registered' };
            case 'username':
              return { ok: false, error: 'The Username Already Exists' };
            default:
              return { ok: false, error: 'User Already Exists' };
          }
        case 'P2025':
          return { ok: false, error: 'User Not Found' };
        default:
          return { ok: false, error: `Unexpected Server Error${code ? `(Code: ${code})` : ''}` };
      }
    }
  };
}
