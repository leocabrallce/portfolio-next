type Props = {
  value: { url: string; };
};

function CodeSandboxPreview(props: Props) {
  return (
    <iframe
      loading="lazy"
      src={props?.value.url || ""}
      style={{ width: "100%", height: "500px", border: 0, borderRadius: "4px", overflow: "hidden" }}
      autoFocus={false}
      title="CodeSandbox Preview"
      allow="focus-without-user-activation 'none'; geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  );
}

export default CodeSandboxPreview;