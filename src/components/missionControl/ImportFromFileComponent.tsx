import { FileInput } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import * as React from 'react';
import { parseString } from 'xml2js';
import { IAssessment, IAssessmentOverview } from '../../components/assessment/assessmentShape';
import { controlButton } from '../commons';
import { assessmentTemplate, overviewTemplate } from './assessmentTemplates';
import {
  makeEntireAssessment,
  retrieveLocalAssessment,
  storeLocalAssessment,
  storeLocalAssessmentOverview
} from './xmlParseHelper';

type Props = {
  newAssessment: (assessment: IAssessment) => void;
  updateEditingOverview: (overview: IAssessmentOverview) => void;
};

type State = {
  fileInputText: string;
};

export class ImportFromFileComponent extends React.Component<Props, State> {
  private fileReader: FileReader;
  public constructor(props: any) {
    super(props);
    this.handleFileRead = this.handleFileRead.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.makeMission = this.makeMission.bind(this);
    this.state = {
      fileInputText: 'Import XML'
    };
  }

  public componentDidMount() {
    const assessment = retrieveLocalAssessment();
    if (assessment) {
      this.props.newAssessment(assessment);
    }
  }

  public render() {
    return (
      <div>
        <div>Please ensure that the xml uploaded is trustable.</div>
        <div>
          <FileInput
            text={this.state.fileInputText}
            inputProps={{ accept: '.xml' }}
            onChange={this.handleChangeFile}
          />
        </div>
        <div>{controlButton('Make New Mission', IconNames.NEW_OBJECT, this.makeMission)}</div>
      </div>
    );
  }

  private handleFileRead = (file: any) => (e: any) => {
    const content = this.fileReader.result;
    if (content) {
      parseString(content, (err: any, result: any) => {
        // tslint:disable-next-line:no-console
        console.dir(file);
        try {
          const entireAssessment: [IAssessmentOverview, IAssessment] = makeEntireAssessment(result);
          entireAssessment[0].fileName = file.name.slice(0, -4);
          storeLocalAssessmentOverview(entireAssessment[0]);
          this.props.updateEditingOverview(entireAssessment[0]);

          storeLocalAssessment(entireAssessment[1]);
          this.props.newAssessment(entireAssessment[1]);
          this.setState({
            fileInputText: 'Success!'
          });
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.log(err);
          this.setState({
            fileInputText: 'Invalid XML!'
          });
        }
      });
    }
  };

  private handleChangeFile = (e: any) => {
    const files = e.target.files;
    if (e.target.files) {
      this.fileReader = new FileReader();
      this.fileReader.onloadend = this.handleFileRead(files[0]);
      this.fileReader.readAsText(files[0]);
    }
  };

  private makeMission = () => {
    storeLocalAssessmentOverview(overviewTemplate());
    this.props.updateEditingOverview(overviewTemplate());
    storeLocalAssessment(assessmentTemplate());
    this.props.newAssessment(assessmentTemplate());
  };
}

export default ImportFromFileComponent;
